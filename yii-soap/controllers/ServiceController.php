<?php
/**
 * Created by PhpStorm.
 * User: csuaznabar
 * Date: 2020-07-04
 * Time: 17:13
 */

namespace app\controllers;


use app\models\WalletClient;
use app\models\WalletTransaction;
use app\models\WalletValidation;
use yii\db\Exception;
use yii\web\Controller;

class ServiceController extends Controller
{
    public $enableCsrfValidation = false;

    public function actions()
    {
        return [
            'soap' => [
                'class' => 'conquer\services\WebServiceAction',
                //                'classMap' => [
                //                    'ServiceWalletClass' => 'app\controllers\ServiceWalletClass'
                //                ],
            ],
        ];
    }

    /**
     * Returns hello and the name that you gave
     *
     * @return string
     * @soap
     */
    public function getVersion()
    {
        return '1.0';
    }

    /**
     * Registers a client on database, and returns true or false depending if it was successful
     *
     * @param string $document
     * @param string $fullName
     * @param string $email
     * @param string $cellphone
     * @return array
     * @soap
     */
    public function registerClient($document, $fullName, $email, $cellphone)
    {
        $temp = WalletClient::find()
            ->where(['document' => $document])
            ->orWhere(['cellphone' => $cellphone])
            ->one();
        if (!$temp) {
            $client            = new WalletClient();
            $client->document  = $document;
            $client->fullName  = $fullName;
            $client->email     = $email;
            $client->cellphone = $cellphone;
            $client->money     = 0.0;
            $client->status    = 1;
            if ($client->save()) {
                return [
                    'status'  => 1,
                    'message' => "client saved successfully"
                ];
            }
            return [
                'status'  => 0,
                'message' => "Can't register client, try again"
            ];
        }
        return [
            'status'  => 0,
            'message' => "document or cellphone already registered"
        ];
    }

    /**
     * Registers money in the clients account
     *
     * @param string $document
     * @param string $cellphone
     * @param double $amount
     * @return array
     * @soap
     */
    public function addMoney($document, $cellphone, $amount)
    {
        $client = WalletClient::find()
            ->where([
                        'document'  => $document,
                        'cellphone' => $cellphone
                    ])
            ->one();
        if ($client) {
            $transaction              = new WalletTransaction();
            $transaction->client_id   = $client->id;
            $transaction->type        = 1; //status 1 is adding money
            $transaction->amount      = $amount;
            $transaction->description = 'Adding money';
            $transaction->date        = date('Y-m-d H:i:s');
            $transaction->status      = 1; // status 1 is transaction valid

            if ($transaction->save()) {
                $client->money += $amount;
                $client->save();
                return [
                    'status'  => 1,
                    'message' => "money saved successfully"
                ];
            }
            return [
                'status'  => 0,
                'message' => "Can't add money, try again later"
            ];
        }
        return [
            'status'  => 0,
            'message' => "Client not found"
        ];
    }

    /**
     * @param string $document
     * @param string $cellphone
     * @param double $amount
     * @param string $description
     * @return array
     * @soap
     */
    public function makePayment($document, $cellphone, $amount, $description)
    {
        $client = WalletClient::find()
            ->where([
                        'document'  => $document,
                        'cellphone' => $cellphone
                    ])
            ->one();
        if ($client) {
            try {
                $dbTransaction            = \Yii::$app->getDb()->beginTransaction();
                $transaction              = new WalletTransaction();
                $transaction->client_id   = $client->id;
                $transaction->type        = 0; //status 0 is for making payments
                $transaction->amount      = $amount;
                $transaction->description = $description;
                $transaction->date        = date('Y-m-d H:i:s');
                $transaction->status      = 0; // status 0 is transaction pending or not confirmed

                if (!$transaction->save()) {
                    $dbTransaction->rollBack();
                    return [
                        'status'  => 0,
                        'message' => "Can't register payment, try again, try again later"
                    ];
                }

                $validation                 = new WalletValidation();
                $validation->transaction_id = $transaction->id;
                $validation->token          = uniqid(); // TODO, implement better token generation function
                $validation->date           = date('Y-m-d H:i:s');
                $validation->status         = 0; // 0 = pending

                if (!$validation->save()) {
                    $dbTransaction->rollBack();
                    return [
                        'status'  => 0,
                        'message' => "Can't register payment, try again, try again later"
                    ];
                }

                $dbTransaction->commit();

                // TODO remove token when sending mail
                return [
                    'status'      => 1,
                    'message'     => "payment saved, please check your email to confirm",
                    'transaction' => $transaction->id,
                    'token'       => $validation->token
                ];
            } catch (Exception $e) {
                return [
                    'status'  => 0,
                    'message' => "Can't register payment, try again, try again later"
                ];
            }
        }
        return [
            'status'  => 0,
            'message' => "Client not found"
        ];
    }

    /**
     * @param string $transaction
     * @param string $token
     * @return array
     * @soap
     */
    public function confirmPayment($transaction, $token)
    {

        $transaction = WalletTransaction::find()->where(['id' => $transaction])->one();
        if ($transaction) {

            if (
                $transaction->walletValidations > 0 &&
                $transaction->walletValidations[0]->token == $token
            ) {
                $client        = $transaction->client;
                $client->money -= $transaction->amount;
                $client->save();

                $validation         = $transaction->walletValidations[0];
                $validation->status = 1;
                $validation->date   = date('Y-m-d H:i:s');
                $validation->save();

                $transaction->status = 1;
                $transaction->save();

                return [
                    'status'  => 1,
                    'message' => "payment processed, your current money is " . $transaction->client->money,
                ];
            }
            return [
                'status'  => 0,
                'message' => "Can't process try again later"
            ];
        }
        return [
            'status'  => 0,
            'message' => "Transaction not found"
        ];

    }

    /**
     * @param string $document
     * @param string $cellphone
     * @return array
     * @soap
     */
    public function checkMoney($document, $cellphone)
    {
        $client = WalletClient::find()
            ->where([
                        'document'  => $document,
                        'cellphone' => $cellphone
                    ])
            ->one();
        if ($client) {
            return [
                'status'  => 1,
                'message' => "Your current money is " . $client->money
            ];
        }

        return [
            'status'  => 0,
            'message' => "Client not found"
        ];
    }

}