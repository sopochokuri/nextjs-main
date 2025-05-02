"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
export default function ContactForm2() {
  const formRef = useRef();
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendMail = (e) => {
    emailjs
      .sendForm("service_ltuvofr", "template_6ozt0vw", formRef.current, {
        publicKey: "wLVy7fGDZhKezF0Iw",
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          handleShowMessage();
          formRef.current.reset();
        } else {
          setSuccess(false);
          handleShowMessage();
        }
      });
  };
  return (
    <section className="bg_grey-7 flat-spacing-9">
      <div className="container">
        <div className="flat-title">
          <span className="title mainfont">გთხოვთ დაგვიკავშირდეთ</span>
          {/* <p className="sub-title text_black-2">
            If you’ve got great products your making or looking to work with us
            then drop us a line.
          </p> */}
        </div>
        <div>
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              sendMail();
            }}
            className="mw-705 mx-auto text-center form-contact"
            id="contactform"
            action="./contact/contact-process.php"
            method="post"
          >
            <div className="d-flex gap-15 mb_15">
              <fieldset className="w-100">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="სახელი *"
                  className="mainfont"
                />
              </fieldset>
              <fieldset className="w-100">
                <input
                  type="email"
                  autoComplete="abc@xyz.com"
                  name="email"
                  id="email"
                  required
                  placeholder="ელ. ფოსტა *"
                  className="mainfont"
                />
              </fieldset>
            </div>
            <div className="mb_15">
              <textarea
                placeholder="შეტყობინება"
                name="message"
                id="message"
                required
                cols={30}
                rows={10}
                defaultValue={""}
                className="mainfont"
              />
            </div>
            <div className="send-wrap">
              <div className={`tfSubscribeMsg ${showMessage ? "active" : ""}`}>
                {success ? (
                  <p style={{ color: "rgb(52, 168, 83)" }}>
                    შეტყობინება წარმატებით გაიგზავნა.
                  </p>
                ) : (
                  <p style={{ color: "red" }}>Something went wrong</p>
                )}
              </div>
              <button
                type="submit"
                className="tf-btn radius-3 btn-fill animate-hover-btn justify-content-center mainfont"
              >
                გაგზავნა
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
