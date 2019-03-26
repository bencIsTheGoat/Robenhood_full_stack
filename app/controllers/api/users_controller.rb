class Api::UsersController < ApplicationController

    def show
    end

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render :show
        else
            render json: @user.errors, status: 501
        end
    end

    def user_params
        params.require(:user).permit(:email, :password, :first_name, :last_name)
    end
end