import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'patternfly-react';

import LabelsTable from 'ui/labels/list/LabelsTable';

const LabelsTabs = ({
  languages, labels, onClickDelete, loading,
}) => {
  const tabs = languages
    .sort(a => (a.isDefault ? -1 : 1))
    .map((lang, i) => (
      <Tab
        key={`lang-tab-${lang.code}`}
        eventKey={i}
        title={lang.isDefault ? `${lang.code}*` : lang.code}
        animation={false}
      >
        <LabelsTable
          langName={lang.name}
          labels={labels.map(label => ({ key: label.key, value: label.titles[lang.code] }))}
          onClickDelete={onClickDelete}
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
  languages: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  onClickDelete: PropTypes.func,
  loading: PropTypes.bool,
};

LabelsTabs.defaultProps = {
  labels: [],
  languages: [{ name: '' }],
  onClickDelete: null,
  loading: false,
};

export default LabelsTabs;
