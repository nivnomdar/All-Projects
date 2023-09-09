class Config {
  public domain = "games.Nif-web.co.il";		// games.nivnomdar.co.il for an example...
  public mysql_host = "localhost";
  public mysql_user = "root";
  public mysql_password = "12345678";
  public mysql_port = 3306;
  public mysql_database = "games";
  public webPort = 4000;
  loginMaxAge =  1000 * 60 * 60 * 24 * 7;
	secret = "A very important secret used by the server to sign the cookies";
}
  
  const config = new Config();
  export default config;