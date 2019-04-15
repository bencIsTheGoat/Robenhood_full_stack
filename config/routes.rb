Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, default: {format: :json} do
    resources :users, only: [:show, :create]
    resource :session, only: [:create, :destroy]
    resources :transactions, only: [:index, :create]
    resources :companies, only: [:show, :create, :index]
    resources :watchlists, only: [:index, :create, :destroy]
  end

  root "static_pages#root"

end
