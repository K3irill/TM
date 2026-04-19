'use client';

import WBIcon from '@/shared/icons/WBIcon';
import WbButton from '@/shared/ui/WbButton/WbButton';
import { motion } from 'framer-motion';
import Link from 'next/link';
import * as S from './styled';

type LabelTone = 'hot' | 'new' | 'sale' | 'limited' | 'mild';
type Label = { text: string; tone: LabelTone };

const sets = [
  {
    id: 1,
    name: 'Dorama Box v1',
    link: '/goods/dorama-box-mini-1',
    img: '/images/ramens/dorama-mini-1/dorama-mini-1-1.png',

    desc: 'Три любимых вкуса с мягкой остротой, палочки, соус, нори и сладости. 💞',
    wbUrl: 'https://www.wildberries.ru/catalog/725849598/detail.aspx',
    // top_label: [{ text: 'Хит', tone: 'hot' }],
    // labels: [{ text: '-30%', tone: 'sale' }] as Label[],
  },
  {
    id: 2,
    name: 'Nong Classic Box',
    link: '/goods/nong-classic-box',
    img: '/images/ramens/nong-classicbox/1.png',

    desc: 'Три вкуснейшних рамена от Nongshimi, палочки, соус, нори и сладости. 💞',
    wbUrl: 'https://www.wildberries.ru/catalog/953490305/detail.aspx',
    // top_label: [{ text: 'Хит', tone: 'hot' }],
    // labels: [{ text: '-30%', tone: 'sale' }] as Label[],
  },
  {
    id: 3,
    name: 'Spicy Box',
    link: '/goods/spicy-box-mini',
    img: '/images/ramens/spicy-mini/spicy-mini-1.png',
    desc: 'Три порций острого рамена, палочки, соус, нори и сладости.🔥',
    // Острые ощущения и драйв для настоящих любителей азиатской кухни. 🔥
    // top_label: [{ text: 'Новинка', tone: 'new' }] as Label[],
    top_label: [],
    labels: null,
    wbUrl: 'https://www.wildberries.ru/catalog/725826752/detail.aspx',
  },
  // {
  // 	id: 3,
  // 	name: 'TARIMI Cheese Box',
  // 	link: '/goods/cheesy-box',
  // 	img: '/images/ramens/cheesy.png',
  // 	desc: 'Нежные сливочно-сырные вкусы, чуть пикантности, палочки и маленькая вкусняшка в подарок. 🧀',
  // 	top_label: [],
  // 	labels: null,
  // 	// top_label: [{ text: 'Limited', tone: 'limited' }] as Label[],
  // },
  // {
  // 	id: 4,
  // 	name: 'Chill & Chill Box',
  // 	img: '/images/ramens/4.jpg',
  // 	desc: 'Комбо: рамен, напитки и чилл-плейлист 🎧',
  // 	labels: null,
  // 	top_label: [{ text: 'Мягкий', tone: 'mild' }] as Label[],
  // },
];

export default function RamenSets() {
  return (
    <S.Section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <S.Header
        as={motion.h2}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <span>🍜</span> Наборы <span>TARIMI</span>
        </div>
        <div>
          <p>
            Собираем уникальные наборы с Азиатским вайбом. Набор состоит из рамена и тщательно
            подобранных допов
          </p>
        </div>
      </S.Header>

      <S.Grid
        as={motion.div}
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {sets.map((set) => {
          return (
            <S.Card
              data-tone={set.top_label?.[0]?.tone}
              key={set.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            >
              <S.GlowBorder aria-hidden />

              {set.top_label?.[0] && (
                <S.Ribbon data-tone={set.top_label[0].tone}>{set.top_label[0].text}</S.Ribbon>
              )}

              <S.ImageWrap
                as={motion.div}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <motion.img
                  src={set.img}
                  alt={set.name}
                  initial={{ scale: 1.03, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                />
              </S.ImageWrap>

              {set.labels?.length ? (
                <S.LabelRow>
                  {set.labels.map((l, i) => (
                    <S.LabelChip
                      key={i}
                      $discount={l.text.match(/\d+/) as unknown as number}
                      data-tone={l.tone}
                    >
                      {l.text}
                    </S.LabelChip>
                  ))}
                </S.LabelRow>
              ) : null}

              <h3>{set.name}</h3>
              <p>{set.desc}</p>

              <S.BtnRow>
                <S.BtnRowTop>
                  <a href={set.wbUrl} target='_blank' rel='nofollow'>
                    <WbButton>
                      Купить на <WBIcon />
                    </WbButton>
                  </a>
                  <Link href={`${set.link}`}>
                    <motion.button
                      whileHover={{
                        scale: 1.04,
                        boxShadow: '0 0 16px rgba(255,79,182,.6)',
                      }}
                      whileTap={{ scale: 0.96 }}
                    >
                      Подробнее
                    </motion.button>
                  </Link>
                  {/* <OzonBtn>
										Купить на <OzonIcon />
									</OzonBtn> */}
                </S.BtnRowTop>
                {/* <Link href={`${set.link}`}>
									<motion.button
										whileHover={{
											scale: 1.04,
											boxShadow: '0 0 16px rgba(255,79,182,.6)',
										}}
										whileTap={{ scale: 0.96 }}
									>
										Подробнее
									</motion.button>
								</Link> */}
              </S.BtnRow>
            </S.Card>
          );
        })}
      </S.Grid>

      <S.BottomLink
        as={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link href='/goods'>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 22px rgba(0,224,255,.55)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            Посмотреть все наборы →
          </motion.button>
        </Link>
      </S.BottomLink>
    </S.Section>
  );
}
