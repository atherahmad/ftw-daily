// import React, { Component } from 'react';
// import config from '../../config';
// import { twitterPageURL } from '../../util/urlHelpers';
// import { StaticPage, TopbarContainer } from '../../containers';
// import {
//   LayoutSingleColumn,
//   LayoutWrapperTopbar,
//   LayoutWrapperMain,
//   LayoutWrapperFooter,
//   Footer,
//   ExternalLink,
//   NamedLink,
//   NewsletterForm,
//   Slider,
//   Slider2,
//   Slideshow,
//   SectionHowItWorks,
//   SectionLast,
// } from '../../components';

// import { FormattedMessage } from '../../util/reactIntl';

// import css from './LandingPage.css';

// import axios from 'axios';

// import { SectionsContainer, Section, Header } from 'react-fullpage';

// import { Footer as LeftFooter } from 'react-fullpage';

// import { gsap, TweenMax } from 'gsap/all';

// import CircularProgress from '@material-ui/core/CircularProgress';

// //ICONS

// import insta from '../../assets/instagram.png';
// import fb from '../../assets/facebook.png';

// import NGO from './NGO.png';
// import Dest from './destinations.png';

// import LoaderImage1 from '../../assets/loader/world.png';
// import LoaderImage2 from '../../assets/loader/airplane.png';

// import article1 from '../../assets/articles/article1.png';
// import article2 from '../../assets/articles/article2.png';
// import article3 from '../../assets/articles/article3.png';
// import article4 from '../../assets/articles/article4.png';
// import article5 from '../../assets/articles/article5.png';
// import article6 from '../../assets/articles/article6.png';

// import ReloadableGIF from './ReloadableGIF';
// import TextTransition, { presets } from 'react-text-transition';

// const WORDS = ['Naturschutz', 'Bildung', 'Gleichberechtigung', 'Tierschutz'];

// export class LandingPage extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       textTransitionIndex: 0,
//       loadingState: false,
//       group1_item1_header: '',
//       group1_item1_image1: '',
//     };
//     // Don't call this.setState() here!
//   }

//   componentDidMount() {
//     window.scrollTo({ top: 0 });
//     var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

//     function preventDefault(e) {
//       e.preventDefault();
//     }

//     function preventDefaultForScrollKeys(e) {
//       if (keys[e.keyCode]) {
//         preventDefault(e);
//         return false;
//       }
//     }

//     // modern Chrome requires { passive: false } when adding event
//     var supportsPassive = false;
//     try {
//       window.addEventListener(
//         'test',
//         null,
//         Object.defineProperty({}, 'passive', {
//           get: function() {
//             supportsPassive = true;
//           },
//         })
//       );
//     } catch (e) {}

//     var wheelOpt = supportsPassive ? { passive: false } : false;
//     var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

//     // call this to Disable
//     function disableScroll() {
//       window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
//       window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
//       window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
//       window.addEventListener('keydown', preventDefaultForScrollKeys, false);
//     }

//     // call this to Enable
//     function enableScroll() {
//       window.removeEventListener('DOMMouseScroll', preventDefault, false);
//       window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
//       window.removeEventListener('touchmove', preventDefault, wheelOpt);
//       window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
//     }
//     disableScroll();

//     setTimeout(() => {
//       enableScroll();
//     }, 5000);

//     setInterval(() => {
//       this.setState({
//         textTransitionIndex: this.state.textTransitionIndex + 1,
//       });
//     }, 3000);

//     setTimeout(() => {
//       this.setState({ loadingState: true });
//     }, 1500);

//     if (window.location.hash) {
//       window.location = '/';
//     }

//     fetch(
//       'https://flex-api.sharetribe.com/v1/api/listings/query?keywords=Grundschule&page=1&include=author,images&fields.listing=title,geolocation,price&fields.user=profile.displayName,profile.abbreviatedName&fields.image=variants.landscape-crop,variants.landscape-crop2x&limit.images=1&per_page=3',
//       {
//         method: 'GET',
//         headers: {
//           authorization:
//             'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXJrZXRwbGFjZS1pZCI6IjVmNjk5MjY3LWQ3ODAtNGYxZC1iM2FkLTE3MWYzYjc4OWEwMyIsImNsaWVudC1pZCI6ImEyMzczNWQ4LWQzYTgtNDM1Zi1hYzk1LWZmOWM4YzdmZTM4OSIsInRlbmFuY3ktaWQiOiI1ZjY5OTI2Ny1kNzgwLTRmMWQtYjNhZC0xNzFmM2I3ODlhMDMiLCJzY29wZSI6InB1YmxpYy1yZWFkIiwiZXhwIjoxNjAzOTg2OTA2fQ.IRB3O1T-CjQ5c7zb8yZK6uGq_rVVzGkpyHu2AYcBxK8',
//         },
//       }
//     )
//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           throw Error(res.statusText);
//         }
//       })
//       .then(json => {
//         this.setState({
//           isLoaded: true,
//           group1_item1_header: json.data[0].attributes.title,
//           group1_item1_image1: json.data[0].relationships.images.data[0].id,

//           group1_item1_geo_lat: json.data[0].attributes.geolocation.lat,
//           data: json.data,
//         });
//         console.log(this.state.data[0].relationships.images.data[0]);
//       })
//       .catch(error => console.error(error));

//     setTimeout(() => {
//       if (this.state.loadingState === true) {
//         var target = document.querySelector('#anima');
//         var target1 = document.querySelector('#anima1');
//         var target2 = document.querySelector('#anima2');
//         var target3 = document.querySelector('#anima3');
//         var target4 = document.querySelector('#anima4');
//         // var target5 = document.querySelector('#anima5');
//         var targetTop = document.querySelector('#topbar');
//         var dots = document.querySelector('#dots');

//         // target10.style.opacity = 0;
//         target.style.opacity = 1;
//         target1.style.opacity = 1;
//         target2.style.opacity = 1;

//         dots.style.opacity = 0;

//         TweenMax.staggerFrom(
//           target,
//           1,
//           {
//             skewX: '5deg',
//             skewY: '5deg',
//             opacity: 0,
//             y: 180,
//             // ease: Power4.easeOut
//           },
//           0.27
//         );

//         TweenMax.staggerFrom(
//           target1,
//           1.5,
//           {
//             skewX: '5deg',
//             skewY: '5deg',
//             opacity: 0,
//             y: 180,
//             // ease: Power4.easeOut
//           },
//           0.27
//         );
//         TweenMax.staggerFrom(
//           target2,
//           2.5,
//           {
//             skewX: '5deg',
//             skewY: '5deg',
//             opacity: 0,
//             y: 180,
//             // ease: Power4.easeOut
//           },
//           1.27
//         );

//         setTimeout(() => {
//           target3.style.opacity = 1;
//           target4.style.opacity = 1;
//           // target5.style.opacity = 1;

//           targetTop.style.opacity = 1;
//           dots.style.opacity = 1;

//           TweenMax.staggerFrom(
//             target3,
//             0.75,
//             {
//               skewX: '-5deg',
//               skewY: '-5deg',
//               opacity: 0,
//               y: -70,
//               // ease: Power4.easeOut
//             },
//             0.67
//           );
//           TweenMax.staggerFrom(
//             target4,
//             1,
//             {
//               skewX: '-5deg',
//               skewY: '-5deg',
//               opacity: 0,
//               y: -70,
//               // ease: Power4.easeOut
//             },
//             0.67
//           );

//           // TweenMax.staggerFrom(
//           //   target5,
//           //   2.75,
//           //   {
//           //     opacity: 0,
//           //     // ease: Power4.easeOut
//           //   },
//           //   0.67
//           // );

//           TweenMax.staggerFrom(
//             targetTop,
//             0.75,
//             {
//               opacity: 0,
//               // ease: Power4.easeOut
//             },
//             0.67
//           );

//           TweenMax.staggerFrom(
//             dots,
//             2,
//             {
//               opacity: 0,

//               // ease: Power4.easeOut
//             },
//             0.67
//           );
//         }, 2500);
//       }
//     }, 1500);

//     document.onscroll = function() {
//       var pos = (document.body.parentNode.scrollTop / window.innerHeight) * 100;

//       console.log(pos);

//       if (pos > 100) {
//         window.location.hash = '#sectionTwo';
//       } else {
//         window.location.hash = '#sectionOne';
//       }
//     };
//   }

//   render() {
//     const fourthClick = () => {
//       alert('hi');
//     };

//     let options = {
//       sectionClassName: 'section',
//       anchors: ['sectionOne', 'sectionTwo', 'sectionThree', 'sectionFour', 'sectionLast'],
//       scrollBar: false,
//       navigation: false,
//       verticalAlign: false,
//       sectionPaddingTop: '0px',
//       sectionPaddingBottom: '0px',
//       arrowNavigation: true,
//       delay: 700,
//     };

//     const slideData = [
//       {
//         index: 0,
//         headline: '200 neue Computer für eine Schule in Nepal',
//         location: 'Heaven Hill Academy',
//         subHeadlineLocation: 'Gaunshanar, Nepal',
//         src: require('../../assets/landingPage/slider_images/heavenHill_story.jpg'),
//         link: './l/heaven-hill-academy/5f699a9c-b07e-4ccb-85cf-84b2bad455f6',
//         itemsHeader: 'zum Thema Bildung',
//         showAllLink: '/s?keywords=bildung',

//         item1_image: require('../../assets/landingPage/slider_images/HeavenHillAcademy.jpg'),
//         item1_link: './l/heaven-hill-academy/5f699a9c-b07e-4ccb-85cf-84b2bad455f6',
//         item1_header: 'Heaven Hill Academy',
//         item1_location: 'Gaunshanar, Nepal',
//         item1_rating: '4.95',
//         item1_price: '28€',

//         item2_image: require('../../assets/landingPage/slider_images/shangila.jpg'),
//         item2_link: './l/heaven-hill-academy/5f699a9c-b07e-4ccb-85cf-84b2bad455f6',
//         item2_header: 'Shangilia',
//         item2_location: 'Nairobi, Kenia ',
//         item2_rating: '4.95',
//         item2_price: '22€',

//         item3_image: require('../../assets/landingPage/slider_images/AldeaYanapay.jpg'),
//         item3_link: './l/heaven-hill-academy/5f699a9c-b07e-4ccb-85cf-84b2bad455f6',
//         item3_header: 'Aldea Yanapay – Sanctuary Lodge ',
//         item3_location: 'Cusco, Peru',
//         item3_rating: '4.95',
//         item3_price: '15€',
//       },
//       {
//         index: 1,
//         headline: '100 Hektar Regenwald Schutzgebiet eingerichtet',
//         location: 'Fazenda Sauva',
//         src: require('../../assets/landingPage/slider_images/Fazenda_story.jpg'),
//         link: './l/heaven-hill-academy/5f699a9c-b07e-4ccb-85cf-84b2bad455f6',
//         itemsHeader: 'zum Thema Naturschutz',
//         showAllLink: '/s?keywords=naturschutz',

//         item1_image: require('../../assets/landingPage/slider_images/Fazenda.jpg'),
//         item1_link: './l/heaven-hill-academy/5f699a9c-b07e-4ccb-85cf-84b2bad455f6',
//         item1_header: 'Fazenda Sauva',
//         item1_location: 'Nilo Pecanha, Brasilien',
//         item1_rating: '4.95',
//         item1_price: '24€',

//         item2_image: require('../../assets/landingPage/slider_images/Chumbe.jpg'),
//         item2_link: './l/heaven-hill-academy/5f699a9c-b07e-4ccb-85cf-84b2bad455f6',
//         item2_header: 'Chumbe Island',
//         item2_location: 'Sansibar, Tansania',
//         item2_rating: '4.95',
//         item2_price: '32€',

//         item3_image: require('../../assets/landingPage/slider_images/Raintree.jpg'),
//         item3_link: './l/heaven-hill-academy/5f699a9c-b07e-4ccb-85cf-84b2bad455f6',
//         item3_header: 'Raintree Foundation',
//         item3_location: 'Chiang Mai, Thailand',
//         item3_rating: '4.95',
//         item3_price: '15€',
//       },

//       {
//         index: 2,
//         headline: '5 verletzte Löwen wieder ausgewildert',
//         location: 'Tenikwa Wildlife',
//         src: require('../../assets/landingPage/slider_images/Tenikwa_story.jpg'),
//         link: './l/heaven-hill-academy/5f699a9c-b07e-4ccb-85cf-84b2bad455f6',
//         itemsHeader: 'zum Thema Tierschutz',
//         showAllLink: '/s?keywords=tierschutz',

//         item1_image: require('../../assets/landingPage/slider_images/Tenikwa.jpg'),
//         item1_link: './l/heaven-hill-academy/5f699a9c-b07e-4ccb-85cf-84b2bad455f6',
//         item1_header: 'Tenikwa Wildlife',
//         item1_location: 'Plettenberg Bay, Südafrika',
//         item1_rating: '4.95',
//         item1_price: '14€',

//         item2_image: require('../../assets/landingPage/slider_images/KindredSpirit.jpg'),
//         item2_link: './l/heaven-hill-academy/5f699a9c-b07e-4ccb-85cf-84b2bad455f6',
//         item2_header: 'Kindred Spirit Elephant Sanctuary',
//         item2_location: 'Chiang Mai, Thailand',
//         item2_rating: '4.95',
//         item2_price: '32€',

//         item3_image: require('../../assets/landingPage/slider_images/Rarec.jpg'),
//         item3_link: './l/heaven-hill-academy/5f699a9c-b07e-4ccb-85cf-84b2bad455f6',
//         item3_header: 'RAREC',
//         item3_location: 'Iquitos, Peru',
//         item3_rating: '4.95',
//         item3_price: '15€',
//       },

//       {
//         index: 3,
//         headline: 'Einrichtung einer neuen Bibliotek ',
//         location: 'Qosqu Maki',
//         src: require('../../assets/landingPage/slider_images/QosqoMaki_story.jpg'),
//         link: './l/heaven-hill-academy/5f699a9c-b07e-4ccb-85cf-84b2bad455f6',
//         itemsHeader: 'zum Thema Community',
//         showAllLink: '/s?keywords=community',

//         item1_image: require('../../assets/landingPage/slider_images/hausDerSolidarität.jpg'),
//         item1_link: './l/heaven-hill-academy/5f699a9c-b07e-4ccb-85cf-84b2bad455f6',
//         item1_header: 'Haus der Solidarität',
//         item1_location: 'Bozen, Italien ',
//         item1_rating: '4.95',
//         item1_price: '34€',

//         item2_image: require('../../assets/landingPage/slider_images/missionSurf.jpg'),
//         item2_link: './l/heaven-hill-academy/5f699a9c-b07e-4ccb-85cf-84b2bad455f6',
//         item2_header: 'Mission Surf',
//         item2_location: 'Las Palmas, Mexico',
//         item2_rating: '4.95',
//         item2_price: '32€',

//         item3_image: require('../../assets/landingPage/slider_images/enriquez.jpg'),
//         item3_link: './l/heaven-hill-academy/5f699a9c-b07e-4ccb-85cf-84b2bad455f6',
//         item3_header: 'Enriquez Arte',
//         item3_location: 'Barcelona, Spanien',
//         item3_rating: '4.95',
//         item3_price: '15€',
//       },
//     ];

//     const slideData2 = [
//       {
//         index: 0,
//         headline:
//           'Für ein besonderes Erlebnis zu bezahlen und zu wissen, dass mein Geld direkt in ein Projekt fließt, das Kinder in einem kleinen Dorf in Kambodscha unterstützt, ist ein unglaubliches Gefühl',
//         subHeadline: 'Kathrin',
//         linkName: 'Go Pang Na',
//         link: '/l/volun2thai/5fa182fe-db14-4fa4-8e01-90da66594474',

//         src: require('../../assets/Kathrin.jpg'),
//       },
//       {
//         index: 1,
//         headline:
//           'Während deines Aufenthalts bekommst du einen tiefen Einblick in die Kultur des Landes, kannst dich mit Einheimischen austauschen und die NGO-Projekte direkt vor Ort ansehen.',
//         linkExternal: 'Utopia.de',
//         src: require('../../assets/Kathrin.jpg'),
//       },
//       {
//         index: 2,
//         headline:
//           'Für alle, die gerne nachhaltig reisen und die Einheimischen kennen lernen möchten',
//         subHeadline: 'Jenny',
//         linkName: 'Shangilia',
//         link: '/l/volun2thai/5fa182fe-db14-4fa4-8e01-90da66594474',

//         src: require('../../assets/jenni-min.jpg'),
//       },

//       {
//         index: 3,
//         headline: 'Das kann eine echte Alternative für den globalen Übernachtungsmarkt werden',
//         linkExternal: 'Jetzt.de',
//         src: require('../../assets/support2.png'),
//       },
//     ];

//     var isMobile = false; //initiate as false
//     // device detection
//     if (
//       /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
//         navigator.userAgent
//       ) ||
//       /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
//         navigator.userAgent.substr(0, 4)
//       )
//     ) {
//       isMobile = true;
//     }

//     const pageContent =
//       this.state.loadingState === true && isMobile !== true ? (
//         <div>
//           <Header>
//             <div id="topbar" className={css.topbar}>
//               <TopbarContainer />
//             </div>
//           </Header>

//           <SectionsContainer className="container" {...options}>
//             <Section id="sectionOne" className={css.section}>
//               <Slideshow></Slideshow>

//               <div className={css.HeaderWrapper}>
//                 <div className={css.HeaderWrapperRow}>
//                   <h1 id="anima" className={css.Header1}>
//                     <FormattedMessage id="landing.headline1" />
//                   </h1>
//                 </div>
//                 <div className={css.HeaderWrapperRow}>
//                   <h1 id="anima1" className={css.Header1}>
//                     <FormattedMessage id="landing.headline2" />{' '}
//                   </h1>
//                 </div>
//               </div>

//               <div className={css.HeaderWrapperRowSecond}>
//                 <div id="anima2" className={css.vision}>
//                   <FormattedMessage id="landing.subHeadline1" />{' '}
//                   <TextTransition
//                     inline
//                     text={WORDS[this.state.textTransitionIndex % WORDS.length]}
//                     className="transition-text"
//                     springConfig={presets.wobbly}
//                   />
//                 </div>
//               </div>
//               <div className={css.DesktopLowerHeaderWrapperRows}>
//                 <div className={css.HeaderWrapperRow}>
//                   <div id="anima3" className={css.SubHeader1}>
//                     <img src={NGO} className={css.SubHeaderImage}></img>
//                     <p>
//                       <FormattedMessage id="landing.subHeadline2" />
//                     </p>
//                   </div>
//                 </div>
//                 <div className={css.HeaderWrapperRow}>
//                   <div id="anima4" className={css.SubHeader1}>
//                     <img src={Dest} className={css.SubHeaderImage}></img>
//                     <p>
//                       <FormattedMessage id="landing.subHeadline3" />
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <NamedLink name="SearchPage" className={css.heroButton}>
//                 Check unsere Reiseziele
//               </NamedLink>

//               <ReloadableGIF></ReloadableGIF>
//             </Section>

//             <Section className={css.section}>
//               <h2 className={css.sectionHeader}>
//                 <FormattedMessage id="landing.bookingsHeadline" />
//               </h2>
//               <div className={css.lineCarousel}></div>

//               <div style={{ width: '100vw', overflow: 'hidden', paddingBottom: '10px' }}>
//                 <Slider heading="Example Slider" slides={slideData} slideStates={this.state} />
//               </div>
//             </Section>
//             <Section className={css.sectionAlternative}>
//               <SectionHowItWorks></SectionHowItWorks>
//             </Section>

//             <Section className={css.section}>
//               <h2 className={css.sectionHeader}>Was unsere Reisenden & die Presse sagen</h2>
//               <div className={css.lineCarousel}></div>
//               <div style={{ width: '100vw', overflow: 'hidden', paddingBottom: '10px' }}>
//                 <Slider2 heading="Example Slider" slides={slideData2} slideStates={this.state} />
//               </div>
//               <div className={css.articles}>
//                 <div
//                   className={css.articlesItems}
//                   onClick={function() {
//                     window.open(
//                       'https://www1.wdr.de/radio/cosmo/magazin/specials/socialbnb-100.html',
//                       '_blank'
//                     );
//                   }}
//                 >
//                   <img src={article1} width="100%"></img>
//                 </div>
//                 <div
//                   className={css.articlesItems}
//                   onClick={function() {
//                     window.open(
//                       'https://www.deutschlandfunknova.de/beitrag/socialbnb-guenstige-uebernachtungsmoeglichkeiten-bei-hilfsorganisationen',
//                       '_blank'
//                     );
//                   }}
//                 >
//                   <img src={article2} width="100%"></img>
//                 </div>
//                 <div
//                   className={css.articlesItems}
//                   onClick={function() {
//                     window.open(
//                       'https://www.br.de/puls/themen/welt/socialbnb-sozialvertraeglich-reisen-100.html',
//                       '_blank'
//                     );
//                   }}
//                 >
//                   <img src={article3} width="100%"></img>
//                 </div>
//                 <div
//                   className={css.articlesItems}
//                   onClick={function() {
//                     window.open(
//                       'https://www.br.de/puls/themen/welt/socialbnb-sozialvertraeglich-reisen-100.html',
//                       '_blank'
//                     );
//                   }}
//                 >
//                   <img src={article4} width="100%"></img>
//                 </div>
//                 <div
//                   className={css.articlesItems}
//                   onClick={function() {
//                     window.open(
//                       'https://www.br.de/puls/themen/welt/socialbnb-sozialvertraeglich-reisen-100.html',
//                       '_blank'
//                     );
//                   }}
//                 >
//                   <img src={article5} width="100%"></img>
//                 </div>
//                 <div
//                   className={css.articlesItems}
//                   onClick={function() {
//                     window.open(
//                       'https://www.br.de/puls/themen/welt/socialbnb-sozialvertraeglich-reisen-100.html',
//                       '_blank'
//                     );
//                   }}
//                 >
//                   <img src={article6} width="100%"></img>
//                 </div>
//               </div>
//             </Section>

//             <Section className={css.section}>
//               <SectionLast></SectionLast>
//             </Section>
//           </SectionsContainer>
//         </div>
//       ) : this.state.loadingState === true && isMobile === true ? (
//         // THIS IS MOBILEEEE

//         <div style={{ width: '100vw', overflow: 'hidden' }}>
//           <Header style={{ position: 'fixed', width: '100vw' }}>
//             <div id="topbar" className={css.topbar}>
//               <TopbarContainer />
//             </div>
//           </Header>
//           <div>
//             <Slideshow></Slideshow>
//             {/* <SearchResultsPanel listings={listings} style={{ flexGrow: 1 }}></SearchResultsPanel> */}

//             <div className={css.HeaderWrapper}>
//               <div className={css.HeaderWrapperRow}>
//                 <h1 id="anima" className={css.Header1}>
//                   <FormattedMessage id="landing.headline1" />
//                 </h1>
//               </div>
//               <div className={css.HeaderWrapperRow}>
//                 <h1 id="anima1" className={css.Header1}>
//                   <FormattedMessage id="landing.headline2" />
//                 </h1>
//               </div>
//             </div>

//             <div className={css.HeaderWrapperRowSecond}>
//               <div id="anima2" className={css.vision}>
//                 <FormattedMessage id="landing.subHeadline1" />{' '}
//                 <TextTransition
//                   inline
//                   text={WORDS[this.state.textTransitionIndex % WORDS.length]}
//                   className="transition-text"
//                   springConfig={presets.wobbly}
//                 />
//               </div>
//             </div>
//             <br />
//             <div id="animaButton2" className={css.heroButton}>
//               Check unsere Reiseziele
//             </div>
//             <div className={css.mobileLowerHeaderWrapperRow}>
//               <div className={css.HeaderWrapperRow}>
//                 <div id="anima3" className={css.SubHeader1}>
//                   <img src={NGO} className={css.SubHeaderImage}></img>
//                   <p>
//                     <FormattedMessage id="landing.subHeadline2" />{' '}
//                   </p>
//                 </div>
//               </div>
//               <div className={css.HeaderWrapperRow}>
//                 <div id="anima4" className={css.SubHeader1}>
//                   <img src={Dest} className={css.SubHeaderImage}></img>
//                   <p>
//                     <FormattedMessage id="landing.subHeadline3" />
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <ReloadableGIF></ReloadableGIF>
//           </div>

//           <div style={{ width: '100vw', overflow: 'hidden', paddingBottom: '5vh' }}>
//             <h2 className={css.sectionHeader}>
//               <FormattedMessage id="landing.bookingsHeadline" />
//             </h2>
//             <div className={css.lineCarousel}></div>

//             <Slider heading="Example Slider" slides={slideData} slideStates={this.state} />
//           </div>
//           <div className={css.sectionAlternative}>
//             <SectionHowItWorks></SectionHowItWorks>
//           </div>
//           <div className={css.section}>
//             <h2 className={css.sectionHeader}>Was unsere Reisenden & die Presse sagen</h2>
//             <div className={css.lineCarousel}></div>

//             <Slider2 heading="Example Slider" slides={slideData2} slideStates={this.state} />

//             <div className={css.articles}>
//               <div
//                 className={css.articlesItems}
//                 onClick={function() {
//                   window.open(
//                     'https://www1.wdr.de/radio/cosmo/magazin/specials/socialbnb-100.html',
//                     '_blank'
//                   );
//                 }}
//               >
//                 <img src={article1} width="100%"></img>
//               </div>
//               <div
//                 className={css.articlesItems}
//                 onClick={function() {
//                   window.open(
//                     'https://www.deutschlandfunknova.de/beitrag/socialbnb-guenstige-uebernachtungsmoeglichkeiten-bei-hilfsorganisationen',
//                     '_blank'
//                   );
//                 }}
//               >
//                 <img src={article2} width="100%"></img>
//               </div>
//               <div
//                 className={css.articlesItems}
//                 onClick={function() {
//                   window.open(
//                     'https://www.br.de/puls/themen/welt/socialbnb-sozialvertraeglich-reisen-100.html',
//                     '_blank'
//                   );
//                 }}
//               >
//                 <img src={article3} width="100%"></img>
//               </div>
//               <div
//                 className={css.articlesItems}
//                 onClick={function() {
//                   window.open(
//                     'https://www.br.de/puls/themen/welt/socialbnb-sozialvertraeglich-reisen-100.html',
//                     '_blank'
//                   );
//                 }}
//               >
//                 <img src={article4} width="100%"></img>
//               </div>
//               <div
//                 className={css.articlesItems}
//                 onClick={function() {
//                   window.open(
//                     'https://www.br.de/puls/themen/welt/socialbnb-sozialvertraeglich-reisen-100.html',
//                     '_blank'
//                   );
//                 }}
//               >
//                 <img src={article5} width="100%"></img>
//               </div>
//               <div
//                 className={css.articlesItems}
//                 onClick={function() {
//                   window.open(
//                     'https://www.br.de/puls/themen/welt/socialbnb-sozialvertraeglich-reisen-100.html',
//                     '_blank'
//                   );
//                 }}
//               >
//                 <img src={article6} width="100%"></img>
//               </div>
//             </div>
//           </div>
//           <div className={css.section}>
//             <SectionLast></SectionLast>
//           </div>
//         </div>
//       ) : (
//         <div className={css.loader}>
//           <img src={LoaderImage2} className={css.loaderImage2} width="100px"></img>

//           <img src={LoaderImage1} className={css.loaderImage1} width="100px"></img>
//           {/* <CircularProgress size={50} thickness={2} style={{ color: '#353535' }} /> */}
//         </div>
//       );
//     return (
//       <StaticPage
//         title="Landing Page"
//         schema={{
//           '@context': 'http://schema.org',
//           '@type': 'LandingPage',
//           description: 'About Saunatime',
//           name: 'Landing page',
//         }}
//       >
//         <LeftFooter>
//           <div className={css.LeftFooterContent}>
//             <div id="dots" className={css.dots}>
//               <div
//                 className={
//                   this.props.location.hash === '#sectionOne' || this.props.location.hash === ''
//                     ? css.dot_active
//                     : css.dot
//                 }
//               >
//                 <a className={css.dotInner} href="#sectionOne"></a>
//               </div>

//               <div
//                 className={this.props.location.hash === '#sectionTwo' ? css.dot_active : css.dot}
//               >
//                 <a className={css.dotInner} href="#sectionTwo"></a>
//               </div>

//               <div
//                 className={this.props.location.hash === '#sectionThree' ? css.dot_active : css.dot}
//               >
//                 <a className={css.dotInner} href="#sectionThree"></a>
//               </div>

//               <div
//                 className={this.props.location.hash === '#sectionFour' ? css.dot_active : css.dot}
//               >
//                 <a className={css.dotInner} href="#sectionFour"></a>
//               </div>
//               <div
//                 className={this.props.location.hash === '#sectionLast' ? css.dot_active : css.dot}
//               >
//                 <a className={css.dotInner} href="#sectionLast"></a>
//               </div>
//             </div>
//             <img src={insta} className={css.socialmedia}></img>
//             <img src={fb} className={css.socialmedia2}></img>
//           </div>
//         </LeftFooter>
//         <div className={css.Wrapper}>{pageContent}</div>
//       </StaticPage>
//     );
//   }
// }

// export default LandingPage;
