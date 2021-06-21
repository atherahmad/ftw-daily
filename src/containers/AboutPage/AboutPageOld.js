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
//   Slider_team,
//   SectionHowItWorks,
//   SectionLast,
// } from '../../components';

// import { FormattedMessage } from '../../util/reactIntl';

// import css from './AboutPage.css';

// import MrThy from '../../assets/aboutPage/Mr_thy.png';
// import MrThyLines from '../../assets/aboutPage/Mr_thy_lines.png';

// import { SectionsContainer, Section, Header } from 'react-fullpage';

// import { Footer as LeftFooter } from 'react-fullpage';

// import insta from '../../assets/instagram.png';
// import fb from '../../assets/facebook.png';

// import { gsap, TweenMax } from 'gsap/all';

// import SocialbnbBanner from '../../assets/aboutPage/socialbnbBanner.png';
// import SocialbnbBanner2 from '../../assets/aboutPage/balloons.png';

// import video from '../../assets/aboutPage/video_placeholder.png';
// import Houses from '../../assets/aboutPage/houses.png';
// import Plus from '../../assets/aboutPage/plus.png';
// import Traveler from '../../assets/aboutPage/traveler.png';
// import { divIcon } from 'leaflet';

// import article1 from '../../assets/partners/enactus.png';
// import article2 from '../../assets/partners/Gateway.png';
// import article3 from '../../assets/partners/impact_factory.png';
// import article4 from '../../assets/partners/GIZ.png';
// import article5 from '../../assets/partners/Hs_rhein_waal.png';
// import article6 from '../../assets/partners/City_cards.png';
// import Slider_Team from '../../components/Slider_team/Slider_team';
// export class AboutPage extends Component {
//   constructor(props) {
//     super(props);
//     // Don't call this.setState() here!
//     this.state = {
//       loadingState: false,
//     };
//   }

//   componentDidMount() {
//     this.setState({ loadingState: true });

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
//     }, 2500);

//     if (window.location.hash) {
//       window.location = '/about';
//     }

//     setTimeout(() => {
//       var target = document.querySelector('#anima');
//       var target1 = document.querySelector('#anima1');
//       var target2 = document.querySelector('#anima2');
//       var target3 = document.querySelector('#anima3');

//       var dots = document.querySelector('#dots');
//       dots.style.opacity = 0;

//       target.style.opacity = 1;
//       target1.style.opacity = 1;

//       TweenMax.staggerFrom(
//         target,
//         1,
//         {
//           skewX: '5deg',
//           skewY: '5deg',
//           opacity: 0,
//           y: 180,
//           // ease: Power4.easeOut
//         },
//         0.27
//       );

//       TweenMax.staggerFrom(
//         target1,
//         1.5,
//         {
//           skewX: '5deg',
//           skewY: '5deg',
//           opacity: 0,
//           y: 180,
//           // ease: Power4.easeOut
//         },
//         0.27
//       );
//       TweenMax.staggerFrom(
//         target2,
//         2,
//         {
//           skewX: '5deg',
//           skewY: '5deg',
//           opacity: 0,
//           y: 180,
//           // ease: Power4.easeOut
//         },
//         0.27
//       );

//       setTimeout(() => {
//         target3.style.opacity = 1;

//         dots.style.opacity = 1;

//         TweenMax.staggerFrom(
//           target3,
//           0.75,
//           {
//             skewX: '-5deg',
//             skewY: '-5deg',
//             opacity: 0,
//             y: -70,
//             // ease: Power4.easeOut
//           },
//           0.67
//         );

//         TweenMax.staggerFrom(
//           dots,
//           2,
//           {
//             opacity: 0,

//             // ease: Power4.easeOut
//           },
//           0.67
//         );
//       }, 1000);
//     }, 100);

//     document.onscroll = function() {
//       var pos = (document.body.parentNode.scrollTop / window.innerHeight) * 100;

//       console.log(pos);

//       if (pos > 50) {
//         window.location.hash = '#sectionTwo';
//       } else {
//         window.location.hash = '#sectionOne';
//       }
//     };
//   }

//   render() {
//     const { siteTwitterHandle, siteFacebookPage } = config;
//     const siteTwitterPage = twitterPageURL(siteTwitterHandle);

//     const slideData2 = [
//       {
//         index: 0,
//         name: 'Nils Lohmann',
//         subHeadline: 'Gründer & Kümmerer',
//         email: 'Faultiere streicheln in Brasilien ',
//         src: require('../../assets/man.jpg'),
//       },
//       {
//         index: 1,
//         name: 'Alex Haufschild',
//         subHeadline: 'Gründer & Kümmerer',
//         email: 'Tauchen mit Walgesang vor der Küste Australiens ',

//         src: require('../../assets/man.jpg'),
//       },

//       {
//         index: 2,
//         name: 'Louisa Hain',
//         subHeadline: 'Marketing & Kreativer Kopf ',
//         email: 'Tauchen mit Walgesang vor der Küste Australiens ',

//         src: require('../../assets/man.jpg'),
//       },
//       {
//         index: 3,
//         name: 'Sarah Rüger',
//         subHeadline: 'Partner Acquise',
//         email: 'Tauchen mit Walgesang vor der Küste Australiens ',

//         src: require('../../assets/man.jpg'),
//       },
//     ];

//     let options = {
//       sectionClassName: 'section',
//       anchors: [
//         'sectionOne',
//         'sectionTwo',
//         'sectionThree',
//         'sectionFour',
//         'sectionFive',
//         'sectionSix',
//         'sectionLast',
//       ],
//       scrollBar: false,
//       navigation: false,
//       verticalAlign: false,
//       sectionPaddingTop: '0px',
//       sectionPaddingBottom: '0px',
//       arrowNavigation: false,
//       delay: 700,
//     };

//     let props = this.props;

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

//     const content =
//       this.state.loadingState === true && isMobile !== true ? (
//         <div>
//           <SectionsContainer className="container" {...options}>
//             <Section id="sectionOne" className={css.firstWrapper}>
//               <div className={css.HeaderWrapper}>
//                 <div className={css.HeaderWrapperRow}>
//                   <h1 id="anima" className={css.Header1}>
//                     <FormattedMessage id="about.headline1" />
//                   </h1>
//                 </div>
//                 <div className={css.HeaderWrapperRow}>
//                   <h1 id="anima1" className={css.Header1}>
//                     <FormattedMessage id="about.headline2" />
//                   </h1>
//                 </div>

//                 <div className={css.HeaderWrapperRowSecond}>
//                   <div id="anima3" className={css.SubHeader1}>
//                     <p>
//                       <FormattedMessage id="about.subHeadline" />
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <img src={SocialbnbBanner} className={css.startImage}></img>
//               <img src={SocialbnbBanner2} className={css.startImage2}></img>
//             </Section>

//             <Section>
//               <div className={css.section}>
//                 <div className={css.videoWrapper}>
//                   <div className={css.showVideoicon}></div>

//                   <img src={video} width="100%" className={css.videoImage}></img>
//                 </div>
//               </div>
//             </Section>

//             <Section>
//               <img src={MrThyLines} className={css.storyPhoto}></img>
//               <img
//                 src={MrThy}
//                 className={
//                   window.location.hash === '#sectionThree' ? css.storyPhoto : css.storyPhoto_hide
//                 }
//               ></img>

//               <div className={css.storyWrapper}>
//                 <div className={css.whyTextWrapper}>
//                   <div className={css.storyTextHeaderWrapper}>
//                     <h1 id="anima" className={css.whyTextHeader}>
//                       <FormattedMessage id="about.storyHeadline" />
//                     </h1>
//                   </div>
//                   <div className={css.text}>
//                     <p>
//                       <FormattedMessage id="about.storyTextBlock1" />
//                       <br /> <br />
//                       <FormattedMessage id="about.storyTextBlock2" />
//                       <br /> <br />
//                       <FormattedMessage id="about.storyTextBlock3" />
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </Section>

//             <Section className={css.section}>
//               <div className={css.whyWrapper}>
//                 <div className={css.whyTextWrapper}>
//                   <div className={css.whyTextHeaderWrapper}>
//                     <h1 id="anima" className={css.whyTextHeader}>
//                       <FormattedMessage id="about.whyTextblock1Header" />
//                     </h1>
//                   </div>
//                   <div className={css.text}>
//                     <p>
//                       <FormattedMessage id="about.whyTextblock1Text" />
//                     </p>
//                   </div>
//                 </div>

//                 <div className={css.whyTextWrapper}>
//                   <div className={css.whyTextHeaderWrapper}>
//                     <h1 id="anima" className={css.whyTextHeader}>
//                       <FormattedMessage id="about.whyTextblock2Header" />
//                     </h1>
//                   </div>

//                   <div className={css.text}>
//                     <p>
//                       <FormattedMessage id="about.whyTextblock2Text" />
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className={css.imagesWrapper}>
//                 <div className={css.imagesItemsOuter}>
//                   <img src={Houses} height="100%"></img>
//                 </div>
//                 <div className={css.imagesItemsInner}>
//                   <img src={Plus} height="30%" style={{ marginTop: '60%' }}></img>
//                 </div>
//                 <div className={css.imagesItemsOuter}>
//                   <img src={Traveler} height="100%"></img>
//                 </div>
//               </div>
//             </Section>

//             <Section className={css.section}>
//               <SectionHowItWorks></SectionHowItWorks>
//             </Section>

//             <Section className={css.section}>
//               <h2 className={css.sectionHeader}>Meet the team</h2>
//               <div className={css.lineCarousel}></div>
//               <div style={{ width: '100vw', overflow: 'hidden', paddingBottom: '50px' }}>
//                 <Slider_Team
//                   heading="Example Slider"
//                   slides={slideData2}
//                   slideStates={this.state}
//                 />
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
//                   <img src={article2} width="130%"></img>
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
//                   <img src={article6} width="70%"></img>
//                 </div>
//               </div>
//             </Section>

//             <Section>
//               <SectionLast></SectionLast>
//             </Section>
//           </SectionsContainer>
//         </div>
//       ) : this.state.loadingState === true ? (
//         <div style={{ width: '100vw', overflow: 'hidden' }}>
//           <div id="sectionOne" className={css.firstWrapper}>
//             <div className={css.HeaderWrapper}>
//               <div className={css.HeaderWrapperRow}>
//                 <h1 id="anima" className={css.Header1}>
//                   <FormattedMessage id="about.headline1" />
//                 </h1>
//               </div>
//               <div className={css.HeaderWrapperRow}>
//                 <h1 id="anima1" className={css.Header1}>
//                   <FormattedMessage id="about.headline2" />
//                 </h1>
//               </div>

//               <div className={css.HeaderWrapperRowSecond}>
//                 <div id="anima3" className={css.SubHeader1}>
//                   <p>
//                     <FormattedMessage id="about.subHeadline" />
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <img src={SocialbnbBanner} className={css.startImage}></img>
//             <img src={SocialbnbBanner2} className={css.startImage2}></img>
//           </div>

//           <div className={css.section}>
//             <div className={css.videoWrapper}>
//               <div className={css.showVideoicon}></div>
//               <img src={video} width="100%" className={css.videoImage}></img>
//             </div>
//           </div>

//           <div className={css.section}>
//             <img src={MrThyLines} className={css.storyPhoto}></img>
//             <img
//               src={MrThy}
//               className={
//                 window.location.hash === '#sectionTwo' ? css.storyPhoto : css.storyPhoto_hide
//               }
//             ></img>

//             <div className={css.storyWrapper}>
//               <div className={css.whyTextWrapper}>
//                 <div className={css.storyTextHeaderWrapper}>
//                   <h1 id="anima" className={css.whyTextHeader}>
//                     <FormattedMessage id="about.storyHeadline" />
//                   </h1>
//                 </div>
//                 <br /> <br /> <br /> <br /> <br /> <br />
//                 <br />
//                 <div className={css.text}>
//                   <p>
//                     <FormattedMessage id="about.storyTextBlock1" />
//                     <br /> <br />
//                     <FormattedMessage id="about.storyTextBlock2" />
//                     <br /> <br />
//                     <FormattedMessage id="about.storyTextBlock3" />
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

// <div className={css.section}>
//   <div className={css.whyWrapper}>
//     <div className={css.whyTextWrapper}>
//       <div className={css.whyTextHeaderWrapper}>
//         <h1 id="anima" className={css.whyTextHeader}>
//           <FormattedMessage id="about.whyTextblock1Header" />
//         </h1>
//       </div>
//       <div className={css.text}>
//         <p>
//           <FormattedMessage id="about.whyTextblock1Text" />
//         </p>
//       </div>

//       <div className={css.imagesItemsOuter}>
//         <img src={Houses} width="100%"></img>
//       </div>

//       <div className={css.imagesItemsOuter}>
//         <img src={Plus} width="20%" style={{ marginLeft: 'calc(40vw - 10%)' }}></img>
//       </div>
//     </div>

//     <div className={css.whyTextWrapper}>
//       <div className={css.whyTextHeaderWrapper}>
//         <h1 id="anima" className={css.whyTextHeader}>
//           <FormattedMessage id="about.whyTextblock2Header" />
//         </h1>
//       </div>

//       <div className={css.text}>
//         <p>
//           <FormattedMessage id="about.whyTextblock2Text" />
//         </p>
//       </div>

//       <div className={css.imagesItemsOuter}>
//         <img
//           src={Traveler}
//           width="40%"
//           style={{ marginLeft: '30%', marginTop: '20px', paddingBottom: '80px' }}
//         ></img>
//       </div>
//     </div>
//   </div>
// </div>

//           <div className={css.sectionAlternative}>
//             <SectionHowItWorks></SectionHowItWorks>
//           </div>

//           <div className={css.section}>
//             <h2 className={css.sectionHeader}>Meet the team</h2>
//             <div className={css.lineCarousel}></div>

//             <Slider_team heading="Example Slider" slides={slideData2} slideStates={this.state} />

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
//       ) : null;

//     return (
//       <StaticPage
//         title="About Us"
//         schema={{
//           '@context': 'http://schema.org',
//           '@type': 'AboutPage',
//           description: 'About Saunatime',
//           name: 'About page',
//         }}
//       >
//         <div className={css.Wrapper}>
//           <Header>
//             <div id="topbar">
//               <TopbarContainer />
//             </div>
//           </Header>

//           <LeftFooter>
//             <div className={css.LeftFooterContent}>
//               <div id="dots" className={css.dots}>
//                 <div
//                   className={
//                     this.props.location.hash === '#sectionOne' || this.props.location.hash === ''
//                       ? css.dot_active
//                       : css.dot
//                   }
//                 >
//                   <a className={css.dotInner} href="#sectionOne"></a>
//                 </div>

//                 <div
//                   className={this.props.location.hash === '#sectionTwo' ? css.dot_active : css.dot}
//                 >
//                   <a className={css.dotInner} href="#sectionTwo"></a>
//                 </div>

//                 <div
//                   className={
//                     this.props.location.hash === '#sectionThree' ? css.dot_active : css.dot
//                   }
//                 >
//                   <a className={css.dotInner} href="#sectionThree"></a>
//                 </div>

//                 <div
//                   className={this.props.location.hash === '#sectionFour' ? css.dot_active : css.dot}
//                 >
//                   <a className={css.dotInner} href="#sectionFour"></a>
//                 </div>
//                 <div
//                   className={this.props.location.hash === '#sectionFive' ? css.dot_active : css.dot}
//                 >
//                   <a className={css.dotInner} href="#sectionFive"></a>
//                 </div>
//                 <div
//                   className={this.props.location.hash === '#sectionSix' ? css.dot_active : css.dot}
//                 >
//                   <a className={css.dotInner} href="#sectionSix"></a>
//                 </div>
//                 <div
//                   className={this.props.location.hash === '#sectionLast' ? css.dot_active : css.dot}
//                 >
//                   <a className={css.dotInner} href="#sectionLast"></a>
//                 </div>
//               </div>
//               <img src={insta} className={css.socialmedia}></img>
//               <img src={fb} className={css.socialmedia2}></img>
//             </div>
//           </LeftFooter>

//           {content}
//         </div>
//       </StaticPage>
//     );
//   }
// }

// export default AboutPage;
