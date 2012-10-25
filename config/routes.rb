CampusHunter::Application.routes.draw do

  root :to => "college#show"
  resources :sessions
  resources :users

  get "log_in" => "sessions#new", :as => "log_in"
  get "log_out" => "sessions#destroy", :as => "log_out"
  resources :users
  get "sign_up" => "users#new", :as => "sign_up"
  get "delete_user" => "users#destroy", :as => "delete_user"
  post "users/del"

  resources :college

  resources :applicant do
    collection do
      get 'logic_pursued'
      get 'pairing_pursued'
      post 'pairing_pursued'
      get 'first_tech_pursued'
      post 'first_tech_pursued'
      get 'final_pursued'
      post 'final_pursued'
      post 'logic_pursued'
      post 'save'
      post 'auto_save'
      get 'show'
      post 'show'
      get 'download'
      get 'show_selected'
    end
  end
  match "applicant/logic_pursued/:collegename" => 'Applicant#logic_pursued'
  match "applicant/pairing_pursued/:collegename" => 'Applicant#pairing_pursued'
  match "applicant/first_tech_pursued/:collegename" => 'Applicant#first_tech_pursued'
  match "applicant/final_pursued/:collegename" => 'Applicant#final_pursued'
  match "applicant/download/:collegename" => 'Applicant#download'
  match "applicant/show/:collegename" => 'Applicant#show'
  match "applicant/show/:collegename/:cutoff" => 'Applicant#show'
  match "college/create" => 'College#create'


  #get "college/new"
  #get "college/add_user"
  #get "college/show"

  #get "applicant/logic_pursued"
  #post "applicant/logic_pursued"
  #get "applicant/search"



  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
