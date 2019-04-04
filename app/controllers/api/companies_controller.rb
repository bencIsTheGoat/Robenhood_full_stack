class Api::CompaniesController < ApplicationController

    before_action :ensure_logged_in


    def index
        if current_user
            @companies = Company.all
        else
            render json: ["Please log in to see companies"]
        end
    end

    
    def show
        @company = Company.find(params[:id])
        render '/api/companies/show.json.jbuilder'
    end

    def create
        @company = Company.new(company_params)
        if @company.save
            render '/api/companies/show.json.jbuilder'
        else
            render json: @company.errors, status: 401
        end
    end

    def company_params
        params.require(:company).permit(:name, :ticker)
    end

end