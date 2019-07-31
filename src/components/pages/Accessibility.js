import React, { Component } from 'react';
import '../../styles/Accessibility.css';

export default class Accessibility extends Component {
  componentWillMount() {
    if (window.location.origin === 'https://108leonard.com') {
      window.gtag('config', 'UA-113369414-1', {
        page_title: this.props.metaTitle,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  }

  componentDidMount() {
    /** meta data for page */
    document.title = this.props.metaTitle;
    if (document.getElementsByTagName('meta').description) {
      document.getElementsByTagName(
        'meta'
      ).description.content = this.props.metaDescription;
      document.querySelector(
        "meta[property='og:description']"
      ).content = this.props.metaDescription;
      document.querySelector(
        "meta[property='og:title']"
      ).content = this.props.metaTitle;
    }
    if (document.querySelector("link[rel='canonical']")) {
      document.querySelector("link[rel='canonical']").href =
        window.location.href;
      document.querySelector("meta[property='og:url']").content =
        window.location.href;
    }
    var viewport = document.querySelector('meta[name=viewport]');
    if (viewport) {
      viewport.setAttribute(
        'content',
        'width=device-width, initial-scale=1, user-scalable=1'
      );
    }
  }

  render() {
    return (
      <main className="accessibility-wrapper">
        <div>
          <div>
            <h1 className="font-size">Accessibility Statement</h1>
            <p>
              This Accessibility Statement applies to:{' '}
              <span>108leonard.com</span>
            </p>
          </div>
          <hr className="tall-margin" />
          <div className="photo-row">
            <img
              className="photo-row-image"
              src="/images/16_accessibility/108Leonard_AS_Icon_1.svg"
              alt="Accessibility Logos"
            />
            <img
              className="photo-row-image"
              src="/images/16_accessibility/108Leonard_AS_Icon_2.svg"
              alt="Accessibility Logos"
            />
            <img
              className="photo-row-image"
              src="/images/16_accessibility/108Leonard_AS_Icon_3.svg"
              alt="Accessibility Logos"
            />
          </div>
          <hr className="tall-margin" />
          <div>
            <h2 className="font-size">We Value Digital Inclusion</h2>
            <div>
              <p>
                In our effort to provide a fully accessible and optimized user
                experience for all site visitors, <span>Name</span> has taken
                careful measure to ensure an excellent user experience,
                regardless of the assistive technology being used to access this
                site or the specific abilities of those individuals seeking
                access to this site.
              </p>
              <p>
                The <span>Name</span> website is monitored and tested regularly
                by internal resources and by AudioEye, a third-party provider of
                Web Accessibility testing and monitoring. As issues of
                accessibility are identified, results of automated and manual
                testing are managed through the AudioEye® Digital Accessibility
                Platform. As new solutions are discovered to improve the user
                experience, remediation is tracked through the AudioEye system
                and fixes are implemented to improve the website user
                experience.
              </p>
            </div>
            <hr className="tall-margin" />
            <h2 className="font-size">AudioEye Accessibility Certification</h2>
            <img
              className="audioeye-badge"
              src="/images/16_accessibility/AudioEye_AccessibilityStatement_Graphics_Trusted.png"
              alt="AudioEye Certification - AudioEye Trusted"
            />
            <div>
              <p>
                The AudioEye Certification seal represents a commitment to
                accessibility and digital inclusion. The AudioEye certification
                process involves automatic and manual testing with the goal of
                maximizing conformance with Web Content Accessibility Guidelines
                (WCAG) 2.0 Level AA Success Criteria.
              </p>
              <p>
                AudioEye certifies that the <span>Domain</span> website is in
                the process of being enhanced to conform with WCAG 2.0 Level AA
                Success Criteria to the greatest extent possible.
              </p>
              <p>
                AudioEye and <span>Name</span> continue to collaborate in an
                ongoing effort to maintain conformance and provide an accessible
                user experience for all users.
              </p>
            </div>
            <hr className="tall-margin" />
            <div>
              <p>
                Last updated <span>Month DD, YYYY</span>
              </p>
            </div>
            <hr className="tall-margin" />
            <div>
              <p>
                Notice something wrong? Please Provide your{' '}
                <a
                  className="accessibility-link"
                  data-ae-client-feedback-link="true"
                  href="#"
                >
                  feedback
                </a>
              </p>
            </div>
            <hr className="tall-margin" />
            <div>
              <p>
                This website is regularly tested using a variety of assistive
                technologies. We recommend using the following web browser /
                screen reader combinations for an optimized experience:
              </p>
              <div>
                <ul>
                  <li>
                    <strong>For Windows users:</strong> JAWS and Internet
                    Explorer or NVDA and Firefox
                  </li>
                  <li>
                    <strong>For Mac users:</strong> VoiceOver and Safari or
                    VoiceOver and Chrome
                  </li>
                  <li>
                    <strong>For mobile users:</strong> VoiceOver for the iPhone
                    and TalkBack for Android devices
                  </li>
                </ul>
              </div>
            </div>
            <hr className="tall-margin" />
            <div>
              <p>
                <strong>
                  Improving the User Experience for Users of Assistive
                  Technologies
                </strong>
              </p>
            </div>
            <hr className="tall-margin" />
            <h2 className="font-size">Web Accessibility Guidelines</h2>
            <div>
              <p>
                <span>Name</span> has leveraged the{' '}
                <a
                  className="accessibility-link"
                  href="https://www.audioeye.com/understanding-wcag-2-0/"
                >
                  Web Content Accessibility Guidelines (WCAG) 2.0
                </a>{' '}
                as reference to ensure the web content made available from this
                site is more accessible for individuals with disabilities and
                user friendly for everyone.
              </p>
              <p>
                These globally recognized best practices (as recommended by the
                World Wide Web Consortium) consist of three levels of
                accessibility measurement (A, AA, and AAA). To the greatest
                extent feasible, <span>Name</span> has elected to conform to
                Level AA of these guidelines.
              </p>
              <div>
                <p>Related Links:</p>
                <a
                  className="accessibility-link"
                  href="https://www.w3.org/WAI/"
                >
                  Web Accessibility Initiative (WAI)
                </a>
                <p>
                  <i>
                    Design guidelines for electronic and information technology
                  </i>
                </p>
              </div>
            </div>
            <hr className="tall-margin" />
            <div>
              <p>
                <strong>
                  Improving the User Experience for Users of Assistive
                  Technologies
                </strong>
              </p>
            </div>
            <hr className="tall-margin" />
            <h2 className="font-size">Feedback</h2>
            <div>
              <p>
                <span>Name</span> has leveraged the{' '}
                <a
                  className="accessibility-link"
                  href="https://www.audioeye.com/understanding-wcag-2-0/"
                >
                  Web Content Accessibility Guidelines (WCAG) 2.0
                </a>
                as reference to ensure the web content made available from this
                site is more accessible for individuals with disabilities and
                user friendly for everyone.
              </p>
              <p>
                These globally recognized best practices (as recommended by the
                World Wide Web Consortium) consist of three levels of
                accessibility measurement (A, AA, and AAA). To the greatest
                extent feasible, <span>Name</span> has elected to conform to
                Level AA of these guidelines.
              </p>
              <p>
                If you encounter issues with any page on our site that presents
                a challenge for individuals with disabilities,{' '}
                <a
                  className="accessibility-link"
                  data-ae-client-feedback-link="true"
                  href="#"
                >
                  please submit your feedback
                </a>
              </p>
            </div>
            <hr className="tall-margin" />
            <h2 className="font-size">
              Providing Users with a Free Customizable Assistive Utility
            </h2>
            <div>
              <p>
                <strong>Ally Toolbar</strong>
              </p>
              <p>
                In addition to the above-mentioned techniques and strategies –
                and since not all site visitors have access to assistive tools
                such as screen readers – we provide free Web Enhancement Tools
                that allow site visitors to customize their user experience.
                Activate the Ally Toolbar to access each tool listed below.
              </p>

              <p>
                <strong>Experience the Ally Toolbar</strong>
              </p>
              <p>
                To experience the AudioEye Ally Toolbar, activate the Ally
                Toolbar button in the bottom right hand corner.
              </p>
              <img
                className="experience-image"
                src="/images/16_accessibility/108Leonard_AS_Icon_CTA.svg"
                alt="Cutomize your experience with AudioEye Tools."
              />
              <p>
                <strong>
                  The Ally Toolbar provides Tools Tailored to Needs
                </strong>
              </p>
              <p>
                Learn more about the ways in which the Ally Toolbar allows site
                visitors with diverse abilities to customize their user
                experience:
              </p>
              <a
                className="accessibility-link"
                href="https://www.audioeye.com/technology/"
              >
                Browse All Features
              </a>
              <p>The following tools may be available in the Ally Toolbar:</p>
              <div className="icon-row">
                <img
                  className="icon"
                  src="/images/16_accessibility/108Leonard_AS_Icon_Player.svg"
                  alt=""
                />
                <div>
                  <p>
                    <strong>Player</strong>
                  </p>
                  <p>Listen to the content of a web page read aloud </p>
                </div>
              </div>
              <div className="icon-row">
                <img
                  className="icon"
                  src="/images/16_accessibility/108Leonard_AS_Icon_Reader.svg"
                  alt=""
                />
                <div>
                  <p>
                    <strong>Reader</strong>
                  </p>
                  <p>Customize the visual display of the website</p>
                </div>
              </div>
              <div className="icon-row">
                <img
                  className="icon"
                  src="/images/16_accessibility/108Leonard_AS_Icon_Microphone.svg"
                  alt=""
                />
                <div>
                  <p>
                    <strong>Voice</strong> <i>(if applicable)</i>
                  </p>
                  <p>Command the browser using your voice </p>
                </div>
              </div>
              <div className="icon-row">
                <img
                  className="icon"
                  src="/images/16_accessibility/108Leonard_AS_Icon_SiteMenu.svg"
                  alt=""
                />
                <div>
                  <p>
                    <strong>Site Menu</strong>
                  </p>
                  <p>Navigate simplified menus using your keyboard or mouse </p>
                </div>
              </div>
              <div className="icon-row">
                <img
                  className="icon"
                  src="/images/16_accessibility/108Leonard_AS_Icon_PageElement.svg"
                  alt=""
                />
                <div>
                  <p>
                    <strong>Page Elements Menu</strong>
                  </p>
                  <p>
                    Access page elements and regions with simple keystrokes{' '}
                  </p>
                </div>
              </div>
              <div className="icon-row">
                <img
                  className="icon"
                  src="/images/16_accessibility/108Leonard_AS_Icon_HelpDesk.svg"
                  alt=""
                />
                <div>
                  <p>
                    <strong>AudioEye Help Desk</strong>
                  </p>
                  <p>Report accessibility related issues </p>
                </div>
              </div>
            </div>
            <hr className="tall-margin" />
            <h2 className="font-size">Third-Party Sites</h2>
            <div>
              <p>
                Throughout this website, we make use of different third-party
                websites such as Instagram, YouTube, Twitter, and Facebook to
                spread news and information about <span>Name</span> products and
                services.
              </p>
              <p>
                As made publicly available, here are the Accessibility Policies
                provided from these third-party sites:
              </p>
              <p>
                <a
                  className="accessibility-link"
                  href="https://www.facebook.com/help/141636465971794/"
                >
                  Facebook Accessibility Policy
                </a>
              </p>
              <p>
                <a
                  className="accessibility-link"
                  href="https://support.google.com/youtube/answer/189278?hl=en"
                >
                  YouTube Accessibility Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
