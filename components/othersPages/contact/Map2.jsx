import { socialLinksWithBorder } from "@/data/socials";
import React from "react";

export default function Map2() {
  return (
    <section className="flat-spacing-9">
      <div className="container">
        <div className="tf-grid-layout gap-0 lg-col-2">
          <div className="w-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23868.2567147467!2d44.7817628!3d41.7711176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40446d9981bc3205%3A0x7c2f72bd0a87193!2s64%20David%20Guramishvili%20Ave%2C%20T'bilisi!5e0!3m2!1sen!2sge!4v1611234567890!5m2!1sen!2sge"
              width="100%"
              height={500}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="tf-content-left has-mt">
            <div className="sticky-top">
              {/* <h5 className="mb_20">Visit Our Store2</h5> */}
              <div className="mb_20">
                <p className="mb_15">
                  <strong className="mainfont">მისამართი</strong>
                </p>
                <p className="mainfont">
                  გურამიშვილის #84, თბილისი, საქართველო.
                </p>
              </div>
              <div className="mb_20">
                <p className="mb_15">
                  <strong className="mainfont">ტელეფონი</strong>
                </p>
                <p className="mainfont">551599275</p>
              </div>
              <div className="mb_20">
                <p className="mb_15">
                  <strong className="mainfont">Email</strong>
                </p>
                <p className="mainfont">contact@canshop.ge</p>
              </div>
              <div className="mb_36">
                {/* <p className="mb_15">
                  <strong>Open Time</strong>
                </p> */}
                {/* <p className="mb_15">Our store has re-opened for shopping,</p>
                <p>exchange Every day 11am to 7pm</p> */}
              </div>
              <div>
                <ul className="tf-social-icon d-flex gap-20 style-default">
                  {socialLinksWithBorder.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className={`box-icon link round ${link.className} ${link.borderClass}`}
                      >
                        <i
                          className={`icon ${link.iconSize} ${link.iconClass}`}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
