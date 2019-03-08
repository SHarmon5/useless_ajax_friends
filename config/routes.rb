Rails.application.routes.draw do
  root 'character#index'

  get 'character_form', to: 'characters#form'

  resources :characters do
    resources :quotes
  end
end
