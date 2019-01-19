import { HttpService } from './core/services/http.service';
import { AuthHttpService } from './core/services/auth-http.service';
import { TranslationService } from './core/services/translation.service';
import { ConfigurationService } from './core/services/configuration.service';
import { UserService } from './core/services/user.service';
import { PushNotificationService } from './core/services/push-notification.service';
import { LookupService } from './core/services/lookup.service';
import { LocalForageService } from './core/services/local-forage.service';
import { AuthService } from './components/+auth/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { PromotionService } from './components/promotion/promotion.service';
import { ReviewService } from './components/review/review.service';
import { LoyaltyCardCacheService } from './components/loyalty-card/loyalty-card-cache.service';
import { SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { APP_CONFIG, appConfigFactory } from './app.config';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    autoplay: true,
    direction: 'horizontal',
    slidesPerView: 'auto',
    resistanceRatio: 0,
    keyboard: true
};

export const APP_PROVIDERS = [
    HttpService,
    AuthHttpService,
    AuthService,
    AuthGuard,
    TranslationService,
    ConfigurationService,
    UserService,
    PushNotificationService,
    LookupService,
    LocalForageService,
    PromotionService,
    ReviewService,
    LoyaltyCardCacheService,
    { provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG },
    { provide: APP_CONFIG, useFactory: appConfigFactory }
];