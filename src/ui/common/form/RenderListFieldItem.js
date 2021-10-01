import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup } from 'patternfly-react';
import { Collapse } from 'react-collapse';
import Panel from 'react-bootstrap/lib/Panel';

import SectionTitle from 'ui/common/SectionTitle';

const RenderListFieldItem = ({
  children,
  onSwapItem,
  onRemoveItem,
  order,
  arraySize,
}) => {
  const [opened, setOpened] = useState(true);

  const handleCollapse = () => setOpened(!opened);

  const buttonMoveUp = (index) => {
    if ((index) > 0) {
      return (
        <Button
          className="pull-right"
          bsStyle="default"
          title={`Move up ${index + 1}`}
          onClick={() => onSwapItem(index, -1)}
        >
          <i className="fa fa-sort-asc" />
        </Button>
      );
    }
    return null;
  };

  const buttonMoveDown = (index) => {
    if ((index) < arraySize - 1) {
      return (
        <Button
          className="pull-right"
          bsStyle="default"
          title={`Move down ${index + 1}`}
          onClick={() => onSwapItem(index)}
        >
          <i className="fa fa-sort-desc" />
        </Button>
      );
    }
    return null;
  };

  return (
    <div className="RenderListField__item">
      <Panel>
        <Panel.Heading>
          <SectionTitle
            label={<FormattedMessage id="cms.contents.listitemlabel" values={{ num: order + 1 }} />}
            onClick={handleCollapse}
            collapsable
            noRequired
            isOpened={opened}
            className="RenderListField__heading"
          >
            <ButtonGroup>
              {buttonMoveUp(order)}
              {buttonMoveDown(order, arraySize)}
            </ButtonGroup>
            <Button
              bsStyle="danger"
              title={`Delete ${order + 1}`}
              onClick={() => onRemoveItem(order)}
            >
              <FormattedMessage id="cms.label.delete" />
            </Button>
          </SectionTitle>
        </Panel.Heading>
        <Collapse isOpened={opened}>
          <Panel.Body>
            {children}
          </Panel.Body>
        </Collapse>
      </Panel>
    </div>
  );
};

RenderListFieldItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onSwapItem: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  order: PropTypes.number.isRequired,
  arraySize: PropTypes.number.isRequired,
};

export default RenderListFieldItem;
