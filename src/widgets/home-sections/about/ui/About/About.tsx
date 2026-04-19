'use client';
import Container from '@/shared/ui/container/Container';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as S from './styled';

const About = () => {
  const images = [
    '/images/about/asian-girl.png',
    '/images/about/2.png',
    '/images/about/asian-girl-2.png',
    '/images/about/3.png',
    // '/images/about/4.png',
    '/images/about/6.png',
    // '/images/about/5.png',
  ];

  return (
    <S.AboutSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <Container>
        <S.AboutTitle
          as={motion.h2}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          О бренде <span>TARIMI</span>
        </S.AboutTitle>

        <S.AboutContent>
          <S.ImageWrapper
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          >
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect='fade'
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              speed={2000}
            >
              {images.map((src, i) => (
                <SwiperSlide key={i}>
                  <motion.img
                    src={src}
                    alt='TARIMI lifestyle'
                    initial={{ scale: 1.05 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.2 }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </S.ImageWrapper>

          <S.TextWrapper
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          >
            <h3>Азиатский вечер дома начинается здесь 🍜</h3>
            <p>
              <strong>TARIMI</strong> — это не просто наборы с раменом. Это атмосфера азиатских
              улиц, вкусов и света неоновых огней, собранная в одной коробке. Мы вдохновляемся
              корейскими дорамами, японской сладкой эстетикой и атмосферой вечерних рынков Азии.
            </p>
            <p>
              Каждый бокс — это тщательно подобранные вкусы, закуски и детали, чтобы создать свой{' '}
              <em>“K-night at home”</em>. Ты включаешь любимую дораму или фильм, завариваешь рамен —
              и на несколько часов оказываешься где-то между Сеулом, Токио и уютными уголками Азии.
            </p>
            <S.Highlight>✨ Почувствуй вкус Азии, не выходя из дома.</S.Highlight>
          </S.TextWrapper>
        </S.AboutContent>
      </Container>
    </S.AboutSection>
  );
};

export default About;
