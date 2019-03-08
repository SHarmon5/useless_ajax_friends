class QuotesController < ApplicationController
  before_action :set_character, only: [:index, :create]
  before_action :set_quote, only: [:show, :update, :destroy]

  def index
   render json: @character.quotes
  end

  def show
   render json: @quote
  end

  def create
    @quote = @character.quotes.new(quote_params)
    if @quote.save
      render json: @quote
    else
      render_error(@quote)
    end
  end

  def update
    if @quote.update(quote_params)
      render json: @quote
    else
      render_error(@quote)
    end
  end

  def destroy
    @quote.destroy
    render json: { message: 'removed' }, status: :ok
  end

  private
    def set_character
      @character = Character.find(params[:character_id])
    end

    def set_quote
      @quote = Quote.find(params[:id])
    end

    def quote_params
      params.require(:quote).permit(:description)
    end
end

