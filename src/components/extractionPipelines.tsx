import React, { useEffect, useState } from 'react';
import { Select, AsyncMultiSelect, Field, Input, Switch, Tooltip } from '@grafana/ui';
import _ from 'lodash';
import CogniteDatasource from '../datasource';
import { SelectedProps } from './queryEditor';

export const ExtractionPipelinesTab = (
  props: SelectedProps & { datasource: CogniteDatasource }
) => {
  const { query, onQueryChange, datasource } = props;
  const [extractionPipelines, setExtractionPipelines] = useState([]);
  const [extractionPipelinesQuery, setExtractionPipelinesQuery] = useState(
    query.extractionPipelinesQuery
  );
  useEffect(() => {
    datasource.extractionPipelinesDatasource.getAllExtractionPipelines().then((res) => {
      setExtractionPipelines(
        _.map(res, ({ name, externalId }) => ({ label: name, value: externalId }))
      );
    });
  }, []);
  const makeChenge = (value) => {
    onQueryChange({
      extractionPipelinesQuery: {
        id: value.value,
      },
    });
  };
  return (
    <div className="Extraction Pipelines">
      <Select
        options={extractionPipelines}
        value={extractionPipelinesQuery.id}
        placeholder="Select extraction pipeline"
        className="cognite-dropdown width-20"
        onChange={makeChenge}
      />
    </div>
  );
};
