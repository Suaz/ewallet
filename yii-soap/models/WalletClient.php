<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "wallet_client".
 *
 * @property int $id
 * @property string|null $document
 * @property string|null $fullName
 * @property string|null $email
 * @property string|null $cellphone
 * @property float|null $money
 * @property int|null $status
 *
 * @property WalletTransaction[] $walletTransactions
 */
class WalletClient extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'wallet_client';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['money'], 'number'],
            [['status'], 'integer'],
            [['document', 'email'], 'string', 'max' => 50],
            [['fullName'], 'string', 'max' => 150],
            [['cellphone'], 'string', 'max' => 20],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'document' => 'Document',
            'fullName' => 'Full Name',
            'email' => 'Email',
            'cellphone' => 'Cellphone',
            'money' => 'Money',
            'status' => 'Status',
        ];
    }

    /**
     * Gets query for [[WalletTransactions]].
     *
     * @return \yii\db\ActiveQuery|WalletTransactionQuery
     */
    public function getWalletTransactions()
    {
        return $this->hasMany(WalletTransaction::className(), ['client_id' => 'id']);
    }

    /**
     * {@inheritdoc}
     * @return WalletClientQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new WalletClientQuery(get_called_class());
    }
}
