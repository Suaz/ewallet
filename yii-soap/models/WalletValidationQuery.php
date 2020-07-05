<?php

namespace app\models;

/**
 * This is the ActiveQuery class for [[WalletValidation]].
 *
 * @see WalletValidation
 */
class WalletValidationQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return WalletValidation[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return WalletValidation|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
