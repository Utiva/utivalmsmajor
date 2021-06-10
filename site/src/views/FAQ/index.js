import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import data from 'data/faqs';
import RevielDrop from 'components/RevielDrop';
import Layout from 'Layouts/SideNavListLayout';
import './style.scss';

const FAQ = () => {
  const { info } = useParams();
  const [currentSection, setCurrentection] = useState(
    info === '' || !info ? 'payment' : info
  );

  useEffect(() => {
    setCurrentection(info === '' || !info ? 'payment' : info);
    return () => {};
  }, [info]);

  const newdata = {
    payment: data[0],
    lectures: data[1],
    certificate: data[2],
  };

  useEffect(() => {
    const el = document.querySelector('.side_link[data-active="true"]');

    el && el.scrollIntoView(false);

    return () => {};
  }, [info]);

  return (
    <div className="dash-con faq cx_listnx_full flex-row j-start al-start">
      <Layout
        subClassName="faq_sec"
        links={data.map((inf, i) => (
          <li key={`side_link_courses_${i}`}>
            <NavLink
              exact
              className="side_link"
              to={`/faqs/${inf.link}`}
              data-active={info === inf.link}
            >
              {inf.title}
            </NavLink>
          </li>
        ))}
      >
        {newdata[currentSection].info.map((faq, i) => (
          <RevielDrop
            data-index={i}
            key={`faq_list+${i}`}
            header={
              <h2 className="flex-row j-start">
                <span>{faq.title}</span>
              </h2>
            }
          >
            <div className="inf_x">
              {faq.desc.map((de, i) => (
                <div
                  key={`faq_desc+${i}`}
                  dangerouslySetInnerHTML={{ __html: de }}
                ></div>
              ))}
            </div>
          </RevielDrop>
        ))}
      </Layout>
    </div>
  );
};

export default FAQ;
