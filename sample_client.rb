%w(curb uri).each{|lib| require lib}

class FeedNodeClient
  def initialize(server,app_token)
    @target = "http://#{server}/#{app_token}/"
  end

  def send_msg(msg)
    res = Curl::Easy.http_post(URI.escape(@target + msg))
    throw Exception.new("There was a problem - make sure your token is correct") unless res.response_code == 200
  end
end
