require "rubygems"
require "sinatra"

class Bitweise < Sinatra::Application
  def load_content(name)
    filename = File.join(settings.public_folder, "contents", "#{name}.html")

    if File.readable? filename
      File.open(filename, "r:UTF-8") do |file|
        return file.read
      end
    else
      return false
    end
  end

  get '/:name?' do
    unless params[:name]
      params[:name] = :home
    end

    @content = load_content(params[:name])
    unless @content
      @content = load_content('_404')
    end

    erb :main
  end

  not_found do
    @content = load_content('_404')
    erb :main
  end
end
