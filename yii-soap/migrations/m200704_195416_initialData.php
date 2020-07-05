<?php

use yii\db\Migration;

/**
 * Class m200704_195416_initialData
 */
class m200704_195416_initialData extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('wallet_client', [
            'id'        => $this->primaryKey(),
            'document'  => $this->string(50),
            'fullName'  => $this->string(150),
            'email'     => $this->string(50),
            'cellphone' => $this->string(20),
            'money'     => $this->decimal(10, 4),
            'status'    => $this->integer(1)
        ]);
        $this->createTable('wallet_transaction', [
            'id'          => $this->primaryKey(),
            'client_id'   => $this->integer(),
            'type'        => $this->integer(1),
            'amount'      => $this->decimal(10, 4),
            'description' => $this->text(),
            'date'        => $this->dateTime(),
            'status'      => $this->integer(1)
        ]);
        $this->createIndex(
            'idx_wallet_transaction_client_id',
            'wallet_transaction',
            'client_id'
        );
        $this->addForeignKey(
            'fk_wallet_transaction_client_id',
            'wallet_transaction',
            'client_id',
            'wallet_client',
            'id',
            'CASCADE'
        );


        $this->createTable('wallet_validation', [
            'id'             => $this->primaryKey(),
            'transaction_id' => $this->integer(),
            'token'          => $this->string(150),
            'date'           => $this->dateTime(),
            'status'         => $this->integer(1)
        ]);
        $this->createIndex(
            'idx_wallet_validation_transaction_id',
            'wallet_validation',
            'transaction_id'
        );
        $this->addForeignKey(
            'fk_wallet_validation_transaction_id',
            'wallet_validation',
            'transaction_id',
            'wallet_transaction',
            'id',
            'CASCADE'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m200704_195416_initialData cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m200704_195416_initialData cannot be reverted.\n";

        return false;
    }
    */
}
