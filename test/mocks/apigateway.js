export class ApiGateway
{
  static login = function(user, pass, serverlocation, callback)
  {
    if (pass == 'rody') callback("tokentje")
  }
}
