import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Minus, Plus } from 'lucide-react';
import { useAuth, AVAILABLE_ROLES } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { getRoleHomePath } from '../../components/common/ProtectedRoute';
import { SiteHeader } from '../../components/layout/SiteHeader';
import {
  Button,
  Container,
  Eyebrow,
  Reveal,
  RevealLines,
  SectionIntro,
  useInView,
} from '../../components/ui';

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

const CAPABILITIES = [
  {
    n: '01',
    title: 'Crop recommendation',
    body:
      'Soil chemistry, rainfall and season are read together to rank the crops that will actually pay on a given plot.',
    to: '/crop-recommendation',
    meta: 'Soil & climate model',
  },
  {
    n: '02',
    title: 'Leaf disease diagnosis',
    body:
      'A photograph of a leaf returns a named pathogen and a treatment a farmer can buy locally — in seconds.',
    to: '/disease-detection',
    meta: 'Convolutional network',
  },
  {
    n: '03',
    title: 'Mandi price forecasting',
    body:
      'Years of APMC arrivals and rates become a forward curve, so harvest and sale dates stop being a guess.',
    to: '/price-prediction',
    meta: 'Time-series forecast',
  },
  {
    n: '04',
    title: 'Multilingual voice assistant',
    body:
      'The entire platform answers to spoken Hindi and Hinglish, for the farmers who will never type a query.',
    to: '/weather',
    meta: 'Speech interface',
  },
  {
    n: '05',
    title: 'Direct produce marketplace',
    body:
      'Growers list, buyers procure, payment is held in escrow. The commission layer simply disappears.',
    to: '/marketplace',
    meta: 'Escrow trade',
  },
  {
    n: '06',
    title: 'Schemes & agromet advisory',
    body:
      'Eligibility for state and central schemes, plus localised weather advisories, gathered in one place.',
    to: '/schemes',
    meta: 'Government data',
  },
];

const PROCESS = [
  {
    n: '01',
    title: 'Describe your land',
    body:
      'Soil readings, district and irrigation method. Once — not every time you want an answer.',
  },
  {
    n: '02',
    title: 'Ask in any form',
    body:
      'Type it, speak it in Hindi, or photograph the leaf. The same intelligence sits behind all three.',
  },
  {
    n: '03',
    title: 'Act on the answer',
    body:
      'A named crop, a named disease, a named price window — each with the reasoning shown alongside it.',
  },
  {
    n: '04',
    title: 'Sell without the middle',
    body:
      'List the harvest into the marketplace and deal with the buyer directly, under escrow.',
  },
];

const STATS = [
  { figure: '50K+', label: 'Registered farmers' },
  { figure: '120+', label: 'APMC mandis connected' },
  { figure: '98.4%', label: 'Diagnostic accuracy' },
  { figure: '₹4.2Cr', label: 'Direct trade volume' },
];

const FAQ = [
  {
    q: 'Is AsraVerse free for farmers?',
    a: 'Yes — entirely. Crop recommendation, disease scanning, weather advisory and the voice assistant carry no cost for any Indian farmer, and there is no usage cap.',
  },
  {
    q: 'How does the leaf disease scanner work?',
    a: 'You photograph an affected leaf. A convolutional network trained on labelled crop pathology returns the likely disease with a confidence score, then pairs it with a locally available treatment.',
  },
  {
    q: 'How are marketplace payments protected?',
    a: 'Buyer funds are held in escrow from the moment an order is confirmed and released to the grower only once delivery is acknowledged, so neither side carries the counterparty risk alone.',
  },
  {
    q: 'Does the voice assistant understand Hindi?',
    a: 'It is built for Hindi, Hinglish and regional agricultural vocabulary. Speak a question about crops, mandi rates or a remedy and it answers in the same language.',
  },
  {
    q: 'Can I look around before creating an account?',
    a: 'The landing experience is open to everyone. Creating an account takes an email and a password, and lets you keep your land profile and order history between visits.',
  },
];

const MARQUEE = [
  'Crop recommendation',
  'Leaf diagnostics',
  'Mandi forecasting',
  'Voice in Hindi',
  'Direct trade',
  'Agromet advisory',
  'Scheme eligibility',
];

/* -------------------------------------------------------------------------- */
/*  Process step — emphasised as it enters the viewport                       */
/* -------------------------------------------------------------------------- */

const ProcessStep: React.FC<{
  step: (typeof PROCESS)[number];
  last: boolean;
}> = ({ step, last }) => {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.55,
    rootMargin: '-20% 0px -20% 0px',
  });

  return (
    <div
      ref={ref}
      className={`grid gap-6 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16 transition-all duration-700 ease-editorial ${
        last ? '' : 'border-b border-white/10'
      } ${inView ? 'opacity-100' : 'opacity-35'}`}
    >
      <div className="lg:col-span-2">
        <span
          className={`font-display text-numeral font-semibold leading-none transition-colors duration-700 ${
            inView ? 'text-agro-400' : 'text-white/20'
          }`}
        >
          {step.n}
        </span>
      </div>
      <h3 className="lg:col-span-5 text-display-4 font-display font-medium text-white">
        {step.title}
      </h3>
      <p className="lg:col-span-4 lg:col-start-9 text-lede text-white/55 max-w-measure-lg">
        {step.body}
      </p>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

export const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState<UserRole>('FARMER');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleStartNow = (role: UserRole = 'FARMER') => {
    if (user && user.role) navigate(getRoleHomePath(user.role));
    else navigate('/login', { state: { initialRole: role } });
  };

  const role = AVAILABLE_ROLES.find((r) => r.role === activeRole) ?? AVAILABLE_ROLES[0];

  return (
    <div className="bg-ink-950 text-paper-50 overflow-x-clip">
      <SiteHeader />

      <main id="top">
        {/* ================================================================ */}
        {/*  Hero                                                            */}
        {/* ================================================================ */}
        <section className="grain relative min-h-[100svh] flex flex-col justify-end pb-16 pt-40 lg:pb-24">
          {/* Single soft light source, low and left — no neon, no glass. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[10%] top-[15%] h-[38rem] w-[38rem] rounded-full bg-agro-500/[0.07] blur-[130px]"
          />

          <Container className="relative">
            <Reveal>
              <Eyebrow className="text-white/40">
                Built for India's 140 million farmers
              </Eyebrow>
            </Reveal>

            <h1 className="mt-10 font-display font-semibold text-display-1">
              <RevealLines
                delay={120}
                lines={[
                  <>Farming,</>,
                  <>decided by</>,
                  <span className="text-agro-400" key="e">
                    evidence.
                  </span>,
                ]}
              />
            </h1>

            {/* Supporting copy sits off to the right — the hero is deliberately
                asymmetric rather than a centred SaaS block. */}
            <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:items-end">
              <Reveal delay={420} className="lg:col-span-5 lg:col-start-8 order-2 lg:order-none">
                <p className="text-lede text-white/60 max-w-measure-lg">
                  AsraVerse turns soil readings, leaf photographs and a decade of
                  mandi history into decisions a farmer can act on the same
                  morning — in their own language, at no cost.
                </p>
              </Reveal>

              <Reveal
                delay={520}
                className="lg:col-span-6 lg:row-start-1 flex flex-wrap items-center gap-4"
              >
                <Button
                  variant="inverse"
                  size="lg"
                  arrow
                  onClick={() => handleStartNow('FARMER')}
                >
                  Get started
                </Button>
                <Button variant="outline" size="lg" href="#capabilities">
                  Explore the platform
                </Button>
              </Reveal>
            </div>

            <Reveal delay={700} className="mt-20 flex items-center gap-3 text-white/30">
              <ArrowDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
              <span className="text-eyebrow uppercase">Scroll</span>
            </Reveal>
          </Container>
        </section>

        {/* ================================================================ */}
        {/*  Marquee                                                         */}
        {/* ================================================================ */}
        <section
          aria-hidden="true"
          className="marquee border-y border-white/10 py-6 overflow-hidden"
        >
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {MARQUEE.map((item) => (
                  <span key={item} className="flex items-center">
                    <span className="px-8 font-display text-display-4 font-medium text-white/25 whitespace-nowrap">
                      {item}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-agro-500/50" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/*  Manifesto — what this is, who for, what it fixes                */}
        {/* ================================================================ */}
        <section className="py-section">
          <Container>
            <div className="border-t border-white/15 pt-6">
              <Reveal>
                <Eyebrow index="01" className="text-white/40">
                  The problem
                </Eyebrow>
              </Reveal>

              <Reveal delay={80} className="mt-12">
                <p className="font-display text-display-2 font-medium max-w-[16ch]">
                  A crop fails on advice that was never{' '}
                  <span className="text-white/35">measured.</span>
                </p>
              </Reveal>

              <div className="mt-16 grid gap-12 lg:grid-cols-12">
                <Reveal delay={160} className="lg:col-span-4 lg:col-start-7">
                  <p className="text-lede text-white/55">
                    Most smallholders still choose what to sow from habit, sell at
                    whatever the arriving trader offers, and identify disease once
                    the field already shows it. Not because better information
                    does not exist — because it has never been in their hands, in
                    their language, on the morning it mattered.
                  </p>
                </Reveal>
                <Reveal delay={240} className="lg:col-span-3">
                  <p className="text-lede text-white/55">
                    AsraVerse closes that distance. One platform, five kinds of
                    user, and no cost to the grower.
                  </p>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>

        {/* ================================================================ */}
        {/*  Capabilities — numbered editorial rows                          */}
        {/* ================================================================ */}
        <section id="capabilities" className="pb-section">
          <Container>
            <SectionIntro
              index="02"
              label="Capabilities"
              tone="dark"
              align="between"
              title={<span>Six instruments, one field.</span>}
              lede="Each one answers a question a farmer already asks — with a model behind it instead of a rule of thumb."
            />

            <div className="mt-20 border-t border-white/10">
              {CAPABILITIES.map((cap, i) => (
                <Reveal key={cap.n} delay={i * 60}>
                  <Link
                    to={user ? cap.to : '/login'}
                    className="group relative block border-b border-white/10 py-10 lg:py-14"
                  >
                    {/* Hairline that draws across the row on hover */}
                    <span
                      aria-hidden="true"
                      className="rule-grow absolute inset-x-0 bottom-0 h-px bg-agro-400"
                    />

                    <div className="grid gap-5 lg:grid-cols-12 lg:items-baseline lg:gap-10">
                      <span className="lg:col-span-1 font-display text-display-4 font-semibold text-white/25 transition-colors duration-500 group-hover:text-agro-400">
                        {cap.n}
                      </span>

                      <h3 className="lg:col-span-4 font-display text-display-4 font-medium text-white transition-transform duration-700 ease-editorial lg:group-hover:translate-x-3">
                        {cap.title}
                      </h3>

                      <p className="lg:col-span-4 text-white/50 leading-relaxed">
                        {cap.body}
                      </p>

                      <div className="lg:col-span-3 flex items-center justify-between gap-4">
                        <span className="text-eyebrow uppercase text-white/30">
                          {cap.meta}
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="w-6 h-6 shrink-0 text-white/30 transition-all duration-500 ease-editorial group-hover:text-agro-400 group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* ================================================================ */}
        {/*  Process                                                         */}
        {/* ================================================================ */}
        <section id="process" className="py-section border-t border-white/10">
          <Container>
            <SectionIntro
              index="03"
              label="How it works"
              tone="dark"
              title={<span>Four steps, then you are farming.</span>}
            />

            <div className="mt-16 border-t border-white/10">
              {PROCESS.map((step, i) => (
                <ProcessStep key={step.n} step={step} last={i === PROCESS.length - 1} />
              ))}
            </div>
          </Container>
        </section>

        {/* ================================================================ */}
        {/*  Audience — role switcher                                        */}
        {/* ================================================================ */}
        <section id="audience" className="py-section border-t border-white/10">
          <Container>
            <SectionIntro
              index="04"
              label="Who it serves"
              tone="dark"
              title={<span>Five roles on one rail.</span>}
            />

            <div className="mt-16 grid gap-12 lg:grid-cols-12">
              {/* Role list */}
              <div className="lg:col-span-5" role="tablist" aria-label="Platform roles">
                {AVAILABLE_ROLES.map((r) => {
                  const active = r.role === activeRole;
                  return (
                    <button
                      key={r.role}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveRole(r.role)}
                      className={`group flex w-full items-baseline gap-5 border-b border-white/10 py-6 text-left transition-colors duration-500 ${
                        active ? 'text-white' : 'text-white/35 hover:text-white/70'
                      }`}
                    >
                      <span className="text-eyebrow uppercase tabular-nums opacity-50">
                        {r.role.slice(0, 3)}
                      </span>
                      <span className="font-display text-display-4 font-medium">
                        {r.title}
                      </span>
                      <span
                        className={`ml-auto h-px flex-1 max-w-[4rem] bg-agro-400 transition-transform duration-500 ease-editorial ${
                          active ? 'scale-x-100' : 'scale-x-0'
                        }`}
                        style={{ transformOrigin: 'right' }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Active role panel */}
              <div className="lg:col-span-6 lg:col-start-7">
                <div key={role.role} className="reveal" data-revealed="true">
                  <p className="text-eyebrow uppercase text-agro-400">{role.badge}</p>
                  <p className="mt-8 font-display text-display-3 font-medium text-white">
                    {role.titleHi}
                  </p>
                  <p className="mt-8 text-lede text-white/55 max-w-measure-lg">
                    {role.description}
                  </p>
                  <Button
                    variant="outline"
                    size="md"
                    arrow
                    className="mt-12"
                    onClick={() => handleStartNow(role.role)}
                  >
                    Continue as {role.title}
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ================================================================ */}
        {/*  Proof — oversized numerals                                      */}
        {/* ================================================================ */}
        <section className="py-section border-t border-white/10">
          <Container>
            <Reveal>
              <Eyebrow index="05" className="text-white/40">
                Where it stands
              </Eyebrow>
            </Reveal>

            <div className="mt-16 grid gap-y-14 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 90}>
                  <p className="font-display text-numeral font-semibold tracking-tight text-white">
                    {s.figure}
                  </p>
                  <p className="mt-4 border-t border-white/15 pt-4 text-eyebrow uppercase text-white/40">
                    {s.label}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200} className="mt-24 grid gap-10 lg:grid-cols-12">
              <blockquote className="lg:col-span-7">
                <p className="font-display text-display-3 font-medium text-white">
                  “I stopped selling at the gate price. The forecast told me to hold
                  eleven days.”
                </p>
                <footer className="mt-8 text-eyebrow uppercase text-white/40">
                  Wheat grower · Sonipat, Haryana
                </footer>
              </blockquote>
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="font-display text-numeral font-semibold text-agro-400">
                  4.9
                </p>
                <p className="mt-4 border-t border-white/15 pt-4 text-eyebrow uppercase text-white/40">
                  Average farmer rating
                </p>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* ================================================================ */}
        {/*  Mission                                                         */}
        {/* ================================================================ */}
        <section id="about" className="py-section border-t border-white/10">
          <Container>
            <Reveal>
              <Eyebrow index="06" className="text-white/40">
                Why we built it
              </Eyebrow>
            </Reveal>

            <Reveal delay={100} className="mt-14">
              <p className="font-display text-display-2 font-medium max-w-[18ch]">
                Good advice should not depend on{' '}
                <span className="text-agro-400">who you know.</span>
              </p>
            </Reveal>

            <div className="mt-16 grid gap-12 lg:grid-cols-12">
              <Reveal delay={180} className="lg:col-span-5 lg:col-start-7">
                <p className="text-lede text-white/55">
                  The science behind Indian agriculture is public and largely
                  settled. What is missing is delivery — to a farmer with a
                  ₹6,000 phone, an unreliable signal and one season to get it
                  right. We are not inventing new agronomy. We are removing every
                  step between a grower and the answer that already exists.
                </p>
                <Button
                  variant="outline"
                  size="md"
                  arrow
                  className="mt-12"
                  onClick={() => handleStartNow('FARMER')}
                >
                  Start using it
                </Button>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* ================================================================ */}
        {/*  FAQ                                                             */}
        {/* ================================================================ */}
        <section className="py-section border-t border-white/10">
          <Container>
            <SectionIntro
              index="07"
              label="Questions"
              tone="dark"
              title={<span>Before you sign up.</span>}
            />

            <div className="mt-16 border-t border-white/10">
              {FAQ.map((item, i) => {
                const open = openFaq === i;
                return (
                  <Reveal key={item.q} delay={i * 50}>
                    <div className="border-b border-white/10">
                      <h3>
                        <button
                          onClick={() => setOpenFaq(open ? null : i)}
                          aria-expanded={open}
                          aria-controls={`faq-panel-${i}`}
                          className="group flex w-full items-start justify-between gap-8 py-8 text-left"
                        >
                          <span className="font-display text-display-4 font-medium text-white transition-transform duration-700 ease-editorial lg:group-hover:translate-x-2">
                            {item.q}
                          </span>
                          <span className="mt-1 shrink-0 text-white/40 transition-colors group-hover:text-agro-400">
                            {open ? (
                              <Minus className="w-5 h-5" aria-hidden="true" />
                            ) : (
                              <Plus className="w-5 h-5" aria-hidden="true" />
                            )}
                          </span>
                        </button>
                      </h3>
                      <div
                        id={`faq-panel-${i}`}
                        hidden={!open}
                        className="pb-8 lg:pl-[8%]"
                      >
                        <p className="text-lede text-white/55 max-w-measure-lg">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ================================================================ */}
        {/*  Closing CTA                                                     */}
        {/* ================================================================ */}
        <section className="grain relative border-t border-white/10 py-section">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-agro-500/[0.07] blur-[120px]"
          />
          <Container className="relative">
            <Reveal>
              <p className="font-display text-display-1 font-semibold max-w-[12ch]">
                Start this <span className="text-agro-400">season.</span>
              </p>
            </Reveal>

            <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-end">
              <Reveal delay={120} className="lg:col-span-5">
                <p className="text-lede text-white/55">
                  An account takes an email and a password. Everything a farmer
                  needs is free, permanently.
                </p>
              </Reveal>
              <Reveal delay={200} className="lg:col-span-4 lg:col-start-9 flex flex-wrap gap-4">
                <Button variant="inverse" size="lg" arrow onClick={() => handleStartNow('FARMER')}>
                  Create an account
                </Button>
              </Reveal>
            </div>
          </Container>
        </section>
      </main>

      {/* ================================================================== */}
      {/*  Footer                                                            */}
      {/* ================================================================== */}
      <footer id="contact" className="border-t border-white/10 py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-display text-display-4 font-semibold text-white">
                AsraVerse<span className="text-agro-400">.</span>
              </p>
              <p className="mt-6 max-w-measure text-sm text-white/45">
                Agricultural intelligence for Indian smallholders — crop planning,
                disease diagnosis, price forecasting and direct trade.
              </p>
            </div>

            <nav aria-label="Platform" className="lg:col-span-3 lg:col-start-7">
              <p className="text-eyebrow uppercase text-white/35">Platform</p>
              <ul className="mt-6 space-y-3 text-sm text-white/55">
                {CAPABILITIES.slice(0, 4).map((c) => (
                  <li key={c.n}>
                    <Link to={user ? c.to : '/login'} className="link-underline hover:text-white">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Portals" className="lg:col-span-3">
              <p className="text-eyebrow uppercase text-white/35">Portals</p>
              <ul className="mt-6 space-y-3 text-sm text-white/55">
                <li>
                  <Link to="/admin/login" className="link-underline hover:text-white">
                    Administration
                  </Link>
                </li>
                <li>
                  <Link to="/expert/login" className="link-underline hover:text-white">
                    KVK agri expert
                  </Link>
                </li>
                <li>
                  <Link to="/transport/login" className="link-underline hover:text-white">
                    Logistics partner
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="link-underline hover:text-white">
                    Farmer & buyer
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-eyebrow uppercase text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} AsraVerse AI</span>
            <span>Kisan Call Centre · 1800 180 1551</span>
          </div>
        </Container>
      </footer>
    </div>
  );
};
