import React, { useEffect, useState } from 'react';
import { Select, AsyncMultiSelect, Field, Input, Switch, Tooltip } from '@grafana/ui';
import _ from 'lodash';
import CogniteDatasource from '../datasource';
import { SelectedProps } from './queryEditor';
import '../css/extraction.css';

export const ExtractionPipelinesTab = (
  props: SelectedProps & { datasource: CogniteDatasource }
) => {
  const {
    query: { extractionPipelinesQuery },
    onQueryChange,
    datasource,
  } = props;
  const { numeric, id } = extractionPipelinesQuery;
  const [extractionPipelines, setExtractionPipelines] = useState([]);

  useEffect(() => {
    datasource.extractionPipelinesDatasource.getAllExtractionPipelines().then((res) => {
      setExtractionPipelines(
        _.map(res, ({ name, externalId }) => ({ label: name, value: externalId }))
      );
    });
  }, []);
  return (
    <div className="extraction-pipelines">
      <Field label="Extaction Pipeline: ">
        <Select
          options={extractionPipelines}
          value={id}
          placeholder="Select extraction pipeline"
          className="cognite-dropdown width-20"
          onChange={(value) =>
            onQueryChange({
              extractionPipelinesQuery: {
                ...extractionPipelinesQuery,
                id: value.value,
              },
            })
          }
        />
      </Field>
      <Field label="Change to numeric status">
        <Switch
          value={numeric}
          onChange={() =>
            onQueryChange({
              extractionPipelinesQuery: {
                ...extractionPipelinesQuery,
                numeric: !numeric,
              },
            })
          }
        />
      </Field>
    </div>
  );
};
