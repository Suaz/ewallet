<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "wallet_validation".
 *
 * @property int $id
 * @property int|null $transaction_id
 * @property string|null $token
 * @property string|null $date
 * @property int|null $status
 *
 * @property WalletTransaction $transaction
 */
class WalletValidation extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'wallet_validation';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['transaction_id', 'status'], 'integer'],
            [['date'], 'safe'],
            [['token'], 'string', 'max' => 150],
            [['transaction_id'], 'exist', 'skipOnError' => true, 'targetClass' => WalletTransaction::className(), 'targetAttribute' => ['transaction_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'transaction_id' => 'Transaction ID',
            'token' => 'Token',
            'date' => 'Date',
            'status' => 'Status',
        ];
    }

    /**
     * Gets query for [[Transaction]].
     *
     * @return \yii\db\ActiveQuery|WalletTransactionQuery
     */
    public function getTransaction()
    {
        return $this->hasOne(WalletTransaction::className(), ['id' => 'transaction_id']);
    }

    /**
     * {@inheritdoc}
     * @return WalletValidationQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new WalletValidationQuery(get_called_class());
    }
}
