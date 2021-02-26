import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import GenericModal from 'ui/common/modal/GenericModal';

const SPECIAL_CHARS_LABELS = {
  Ŵ: 'Latin capital letter W with circumflex',
  ŵ: 'Latin small letter w with circumflex',
  Ŷ: 'Latin capital letter Y with circumflex',
  ŷ: 'Latin small letter y with circumflex',
  '‛': 'Single high-reversed-9 quotation mark',
  '►': 'Black right-pointing pointer',
  '€': 'Euro sign',
  '‘': 'Left single quotation mark',
  '’': 'Right single quotation mark',
  '“': 'Left double quotation mark',
  '”': 'Right double quotation mark',
  '–': 'En dash',
  '—': 'Em dash',
  '¡': 'Inverted exclamation mark',
  '¢': 'Cent sign',
  '£': 'Pound sign',
  '¤': 'Currency sign',
  '¥': 'Yen sign',
  '¦': 'Broken bar',
  '§': 'Section sign',
  '¨': 'Diaeresis',
  '©': 'Copyright sign',
  ª: 'Feminine ordinal indicator',
  '«': 'Left-pointing double angle quotation mark',
  '¬': 'Not sign',
  '®': 'Registered sign',
  '¯': 'Macron',
  '°': 'Degree sign',
  '²': 'Superscript two',
  '³': 'Superscript three',
  '´': 'Acute accent',
  µ: 'Micro sign',
  '¶': 'Pilcrow sign',
  '·': 'Middle dot',
  '¸': 'Cedilla',
  '¹': 'Superscript one',
  º: 'Masculine ordinal indicator',
  '»': 'Right-pointing double angle quotation mark',
  '¼': 'Vulgar fraction one quarter',
  '½': 'Vulgar fraction one half',
  '¾': 'Vulgar fraction three quarters',
  '¿': 'Inverted question mark',
  À: 'Latin capital letter A with grave accent',
  Á: 'Latin capital letter A with acute accent',
  Â: 'Latin capital letter A with circumflex',
  Ã: 'Latin capital letter A with tilde',
  Ä: 'Latin capital letter A with diaeresis',
  Å: 'Latin capital letter A with ring above',
  Æ: 'Latin capital letter Æ',
  Ç: 'Latin capital letter C with cedilla',
  È: 'Latin capital letter E with grave accent',
  É: 'Latin capital letter E with acute accent',
  Ê: 'Latin capital letter E with circumflex',
  Ë: 'Latin capital letter E with diaeresis',
  Ì: 'Latin capital letter I with grave accent',
  Í: 'Latin capital letter I with acute accent',
  Î: 'Latin capital letter I with circumflex',
  Ï: 'Latin capital letter I with diaeresis',
  Ð: 'Latin capital letter Eth',
  Ñ: 'Latin capital letter N with tilde',
  Ò: 'Latin capital letter O with grave accent',
  Ó: 'Latin capital letter O with acute accent',
  Ô: 'Latin capital letter O with circumflex',
  Õ: 'Latin capital letter O with tilde',
  Ö: 'Latin capital letter O with diaeresis',
  '×': 'Multiplication sign',
  Ø: 'Latin capital letter O with stroke',
  Ù: 'Latin capital letter U with grave accent',
  Ú: 'Latin capital letter U with acute accent',
  Û: 'Latin capital letter U with circumflex',
  Ü: 'Latin capital letter U with diaeresis',
  Ý: 'Latin capital letter Y with acute accent',
  Þ: 'Latin capital letter Thorn',
  ß: 'Latin small letter sharp s',
  à: 'Latin small letter a with grave accent',
  á: 'Latin small letter a with acute accent',
  â: 'Latin small letter a with circumflex',
  ã: 'Latin small letter a with tilde',
  ä: 'Latin small letter a with diaeresis',
  å: 'Latin small letter a with ring above',
  æ: 'Latin small letter æ',
  ç: 'Latin small letter c with cedilla',
  è: 'Latin small letter e with grave accent',
  é: 'Latin small letter e with acute accent',
  ê: 'Latin small letter e with circumflex',
  ë: 'Latin small letter e with diaeresis',
  ì: 'Latin small letter i with grave accent',
  í: 'Latin small letter i with acute accent',
  î: 'Latin small letter i with circumflex',
  ï: 'Latin small letter i with diaeresis',
  ð: 'Latin small letter eth',
  ñ: 'Latin small letter n with tilde',
  ò: 'Latin small letter o with grave accent',
  ó: 'Latin small letter o with acute accent',
  ô: 'Latin small letter o with circumflex',
  õ: 'Latin small letter o with tilde',
  ö: 'Latin small letter o with diaeresis',
  '÷': 'Division sign',
  ø: 'Latin small letter o with stroke',
  ù: 'Latin small letter u with grave accent',
  ú: 'Latin small letter u with acute accent',
  û: 'Latin small letter u with circumflex',
  ü: 'Latin small letter u with diaeresis',
  ý: 'Latin small letter y with acute accent',
  þ: 'Latin small letter thorn',
  ÿ: 'Latin small letter y with diaeresis',
  Œ: 'Latin capital ligature OE',
  œ: 'Latin small ligature oe',
  '‚': 'Single low-9 quotation mark',
  '„': 'Double low-9 quotation mark',
  '…': 'Horizontal ellipsis',
  '™': 'Trade mark sign',
  '•': 'Bullet',
  '→': 'Rightwards arrow',
  '⇒': 'Rightwards double arrow',
  '⇔': 'Left right double arrow',
  '♦': 'Black diamond suit',
  '≈': 'Almost equal to',
};

const SPECIAL_CHARS = [
  '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', '-', '.', '/',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';',
  '<', '=', '>', '?', '@',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '[', ']', '^', '_', '`',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
  'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '{', '|', '}', '~',
  '€', '‘', '’', '“', '”', '–', '—', '¡', '¢', '£',
  '¤', '¥', '¦', '§', '¨', '©', 'ª', '«', '¬', '®', '¯',
  '°', '²', '³', '´', 'µ', '¶', '·', '¸', '¹', 'º', '»',
  '¼', '½', '¾', '¿', 'À', 'Á', 'Â', 'Ã', 'Ä', 'Å',
  'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï',
  'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', '×', 'Ø', 'Ù',
  'Ú', 'Û', 'Ü', 'Ý', 'Þ', 'ß', 'à', 'á', 'â', 'ã',
  'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í',
  'î', 'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', '÷',
  'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'þ', 'ÿ', 'Œ', 'œ',
  'Ŵ', 'Ŷ', 'ŵ', 'ŷ', '‚', '‛', '„', '…', '™', '►', '•',
  '→', '⇒', '⇔', '♦', '≈',
];

const ID = 'SpecialCharSelectorModal';

const SpecialCharSelectorModal = ({ isVisible, onSelect, onClose }) => {
  const renderedModalTitle = (
    <Modal.Title>
      <FormattedMessage id="specialcharModal.title" />
    </Modal.Title>
  );

  return (
    <GenericModal
      modalClassName="SpecialCharSelectorModal"
      visibleModal={isVisible ? ID : null}
      modalId={ID}
      modalTitle={renderedModalTitle}
      modalFooter={<React.Fragment />}
      onCloseModal={onClose}
    >
      {SPECIAL_CHARS.map(char => (
        <Button
          key={char}
          style={{ width: '25.5px' }}
          title={SPECIAL_CHARS_LABELS[char] || char}
          onClick={() => onSelect(char)}
        >
          {char}
        </Button>
      ))}
    </GenericModal>
  );
};

SpecialCharSelectorModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SpecialCharSelectorModal;
