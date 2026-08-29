import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useVoiceAssistant } from '../../context/VoiceAssistantContext';
import { Button } from '../../components/ui';
import { PageHeader, Panel, ActionTile, StatFigure } from '../../components/dashboard';

export const FarmerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { openVoiceAssistant } = useVoiceAssistant();

  const quickActions = [
    {
      index: '01',
      title: 'AI Crop Recommend',
      body: 'Rank the crops that will pay on your plot, from soil chemistry and season.',
      to: '/crop-recommendation',
    },
    {
      index: '02',
      title: 'Scan Leaf Disease',
      body: 'Photograph an affected leaf for a named pathogen and a local treatment.',
      to: '/disease-detection',
    },
    {
      index: '03',
      title: 'Mandi Price Forecast',
      body: 'Six-month forward curves so the sale date stops being a guess.',
      to: '/price-prediction',
    },
    {
      index: '04',
      title: 'Sell Crops Online',
      body: 'List your harvest directly to 5,000+ verified buyers under escrow.',
      to: '/marketplace',
    },
  ];

  const liveMandiPrices = [
    { crop: 'Sharbati Wheat (Gehu)', mandi: 'Lucknow APMC', price: '₹2,275', trend: '+3.2%', isUp: true },
    { crop: 'Yellow Mustard (Sarson)', mandi: 'Kanpur Grain Mandi', price: '₹5,650', trend: '+4.8%', isUp: true },
    { crop: 'Basmati Paddy (Dhan)', mandi: 'Varanasi Mandi', price: '₹3,400', trend: '+1.5%', isUp: true },
    { crop: 'Pusa Ruby Tomato', mandi: 'Azadpur Delhi', price: '₹1,850', trend: '-2.1%', isUp: false },
  ];

  return (
    <div className="space-y-14">
      <PageHeader
        eyebrow="Farmer dashboard"
        title={<>Ram Ram, {user?.name || 'Kisan Bhai'}.</>}
        lede={
          <>
            Your farm in <span className="text-ink-950 dark:text-white">Malihabad, Lucknow</span> is
            ready for Rabi preparation. Soil moisture and the coming week both read favourable.
          </>
        }
        actions={
          <>
            <Button variant="primary" size="md" onClick={openVoiceAssistant}>
              <Mic className="h-4 w-4" aria-hidden="true" />
              Bol kar poochhein
            </Button>
            <Button variant="secondary" size="md" to="/profile" arrow>
              Farm profile
            </Button>
          </>
        }
      />

      {/* Conditions */}
      <section>
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          <StatFigure figure="31°C" label="Lucknow · partly cloudy" />
          <StatFigure figure="62%" label="Humidity" />
          <StatFigure figure="10%" label="Rain chance" delta="Next 24h" />
          <StatFigure figure="14" label="Wind km/h" />
        </div>
      </section>

      {/* Services */}
      <section>
        <div className="flex items-baseline justify-between border-b border-ink-950/10 pb-4 dark:border-white/10">
          <h2 className="font-display text-xl font-semibold text-ink-950 dark:text-white">
            Key agriculture services
          </h2>
          <span className="text-eyebrow uppercase text-ink-400">मुख्य सेवाएं</span>
        </div>

        <div className="grid gap-x-12 lg:grid-cols-2">
          {quickActions.map((a) => (
            <ActionTile key={a.index} {...a} />
          ))}
        </div>
      </section>

      {/* Mandi + advisory */}
      <section className="grid gap-8 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2"
          title="Live mandi prices"
          meta="Daily modal rates · UP & Delhi APMC · per quintal"
          action={
            <Link
              to="/price-prediction"
              className="link-underline text-[13px] text-ink-500 hover:text-ink-950 dark:text-ink-400 dark:hover:text-white"
            >
              AI forecast
            </Link>
          }
        >
          <ul>
            {liveMandiPrices.map((item) => (
              <li
                key={item.crop}
                className="flex items-baseline justify-between gap-4 border-b border-ink-950/10 py-4 last:border-0 dark:border-white/10"
              >
                <div>
                  <p className="text-sm text-ink-950 dark:text-white">{item.crop}</p>
                  <p className="mt-0.5 text-xs text-ink-400">{item.mandi}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg font-semibold tabular-nums text-ink-950 dark:text-white">
                    {item.price}
                  </p>
                  <span
                    className={`text-xs tabular-nums ${
                      item.isUp
                        ? 'text-agro-600 dark:text-agro-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {item.trend}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="space-y-8">
          <Panel
            title="Agromet advisory"
            meta="Rabi sowing window"
            action={
              <Link
                to="/weather"
                className="link-underline text-[13px] text-ink-500 hover:text-ink-950 dark:text-ink-400 dark:hover:text-white"
              >
                7-day
              </Link>
            }
          >
            <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              Favourable for ploughing and bed preparation. Postpone pesticide
              sprays on the 17th — showers are predicted.
            </p>
          </Panel>

          <Link
            to="/schemes"
            className="group block border border-ink-950/10 p-6 transition-colors duration-500 hover:border-ink-950/30 dark:border-white/10 dark:hover:border-white/30"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-eyebrow uppercase text-agro-600 dark:text-agro-400">
                PM-KISAN · 17th instalment
              </p>
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-ink-300 transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
            <p className="mt-4 font-display text-2xl font-semibold text-ink-950 dark:text-white">
              ₹2,000
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              Check your e-KYC status and Aadhaar bank link to receive the benefit.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
};
