class Api::CompaniesController < ApplicationController

    
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