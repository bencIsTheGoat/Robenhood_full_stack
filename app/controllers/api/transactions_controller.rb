class Api::TransactionsController < ApplicationController

    before_action :ensure_logged_in

    def show
    end

    def index
        if current_user
            @transactions = current_user.transactions
        else
            render json: ['Please log in to see transactions']
        end
    end

    def create
        @transaction = Transaction.new(transaction_params)
        @transaction.user_id = current_user.id
        if @transaction.save
            render :show
        else
            render json: @transaction.errors, status: 401
        end
    end

    def transaction_params
        params.require(:transaction).permit(:company_id, :transaction_type, :price, :shares)
    end

end