import React from 'react';
import { config } from '../../../utils/index';
import './footer.less';

const Footer = () => (
  <div className="footer">
    {config.footerText}
  </div>
);

export default Footer;
