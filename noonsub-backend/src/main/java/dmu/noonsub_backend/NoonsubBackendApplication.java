package dmu.noonsub_backend;

import dmu.noonsub_backend.global.sms.naver.NaverProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableConfigurationProperties(NaverProperties.class)
public class NoonsubBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(NoonsubBackendApplication.class, args);
	}

}
