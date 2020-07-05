<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "wallet_transaction".
 *
 * @property int $id
 * @property int|null $client_id
 * @property int|null $type
 * @property float|null $amount
 * @property string|null $description
 * @property string|null $date
 * @property int|null $status
 *
 * @property WalletClient $client
 * @property WalletValidation[] $walletValidations
 */
class WalletTransaction extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'wallet_transaction';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['client_id', 'type', 'status'], 'integer'],
            [['amount'], 'number'],
            [['description'], 'string'],
            [['date'], 'safe'],
            [['client_id'], 'exist', 'skipOnError' => true, 'targetClass' => WalletClient::className(), 'targetAttribute' => ['client_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'client_id' => 'Client ID',
            'type' => 'Type',
            'amount' => 'Amount',
            'description' => 'Description',
            'date' => 'Date',
            'status' => 'Status',
        ];
    }

    /**
     * Gets query for [[Client]].
     *
     * @return \yii\db\ActiveQuery|WalletClientQuery
     */
    public function getClient()
    {
        return $this->hasOne(WalletClient::className(), ['id' => 'client_id']);
    }

    /**
     * Gets query for [[WalletValidations]].
     *
     * @return \yii\db\ActiveQuery|WalletValidationQuery
     */
    public function getWalletValidations()
    {
        return $this->hasMany(WalletValidation::className(), ['transaction_id' => 'id']);
    }

    /**
     * {@inheritdoc}
     * @return WalletTransactionQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new WalletTransactionQuery(get_called_class());
    }
}
