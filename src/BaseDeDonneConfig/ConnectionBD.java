package BaseDeDonneConfig;


import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
public class ConnectionBD {
    private final String URL = "jdbc:mysql://localhost:3306/hopitel?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC&useSSL=false";
    private final String USER = "bahmed";
    private final String DRIVER = "com.mysql.jdbc.Driver";
    private final String PASSWORD = "1999";
    private DriverManagerDataSource dataSource;
    private JdbcTemplate jdbcTemplate;

    public ConnectionBD() {
        this.dataSource =  new DriverManagerDataSource();
        dataSource.setUrl(URL);
        dataSource.setUsername(USER);
        dataSource.setPassword(PASSWORD);
        dataSource.setDriverClassName(DRIVER);
        jdbcTemplate=new JdbcTemplate(dataSource);
    }

    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }
}
