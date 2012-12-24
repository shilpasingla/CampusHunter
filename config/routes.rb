CampusHunter::Application.routes.draw do

  root :to => "applicant#home"
  resources :sessions
  resources :users

  get "log_in" => "sessions#new", :as => "log_in"
  get "log_out" => "sessions#destroy", :as => "log_out"
  resources :users
  get "sign_up" => "users#new", :as => "sign_up"
  get "delete_user" => "users#destroy", :as => "delete_user"
  post "users/del"

  resources :college, :except => :new do
    collection do
      get 'delete'
    end
  end

  resources :pool do
    collection do
      get 'delete'
    end
  end

  resources :applicant do
    collection do
      get 'home'
      get 'codePairing'
      get 'firstTech'
      post 'firstTech'
      get 'secondTech'
      post 'secondTech'
      get 'final_pursued'
      post 'final_pursued'
      post 'codePairing'
      post 'save'
      post 'auto_save'
      get 'show'
      post 'show'
      get 'download'
      get 'download_for_campus'
      get 'show_selected'
      get 'search'
    end
  end
  match "applicant/download/:round/:collegeId/:collegename" => 'Applicant#download'
  match "applicant/download_for_campus/:round/:collegeId/:collegename" => 'Applicant#download_for_campus'
  match "applicant/show/:collegeId" => 'Applicant#show'
  match "applicant/show/:poolname/:year" => 'Applicant#show'
  match "college/show" => 'College#show'
  match "college/show/:name" => 'College#show'
  # match "college/create" => 'College#create'
  match "college/delete/:id" => 'College#delete'
  match "pool/create" => 'Pool#create'
  match "pool/delete/:name" => 'Pool#delete'
  match "pool/show" => 'Pool#show'

  #get "college/new"
  #get "college/add_user"
  #get "college/show"

  #get "applicant/codePairing"
  #post "applicant/codePairing"
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
