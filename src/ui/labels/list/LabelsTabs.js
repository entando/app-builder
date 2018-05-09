import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'patternfly-react';

import LabelsTable from 'ui/labels/list/LabelsTable';


const LabelsTabs = ({
  languages, labels, onClickEditLabel, onClickDeleteLabel, loading,
}) => {
  const tabs = languages
    .sort(a => (a.isDefault ? -1 : 1))
    .map((lang, i) => (
      <Tab
        key={`lang-tab-${lang.code}`}
        eventKey={i}
        title={lang.isDefault ? `${lang.code}*` : lang.code}
      >
        <LabelsTable
          langName={lang.name}
          labels={labels.map(label => ({ key: label.key, value: label.titles[lang.code] }))}
          onClickEditLabel={onClickEditLabel}
          onClickDeleteLabel={onClickDeleteLabel}
          loading={loading}
        />
      </Tab>
    ));
  return (
    <Tabs className="LabelsTabs" defaultActiveKey={0} id="labels-tabs">
      {tabs}
    </Tabs>
  );
};

LabelsTabs.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({})),
  languages: PropTypes.arrayOf(PropTypes.shape({})),
  onClickEditLabel: PropTypes.func,
  onClickDeleteLabel: PropTypes.func,
  loading: PropTypes.bool,
};

LabelsTabs.defaultProps = {
  labels: [],
  languages: [],
  onClickEditLabel: null,
  onClickDeleteLabel: null,
  loading: false,
};

export default LabelsTabs;
