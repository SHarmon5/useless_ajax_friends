class CharactersController < ApplicationController
    before_action :set_character, only: [:show, :update, :detroy]

    
  def index
    @characters = Character.all
  end

  def show
    render partial: 'character', locals: { character: @character}
  end

  def create
    @character = Character.new(character_params)
    if @character.save
      render json: @character
    else
      render_error(@character)
    end
  end

  def update
    if @character.update(character_params)
      render json: @character
    else
      render_error(@character)
    end
  end

  def destroy
    @character.destroy
    render json: {message: 'removed' }, status: :ok
  end
  
  def form
    @character = params[:id] ? Character.find(params[:id]) : Character.new
    render partial: 'form'
  end

  private
    def set_character
      @character = Character.find(params[:id])
    end

    def character_params
      params.require(:character).permit(:name)
    end
end
