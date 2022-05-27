import React, { useEffect, useState } from 'react';
import { AsyncMultiSelect, Field, Input, Switch, Tooltip } from '@grafana/ui';
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
  const { numeric, ids, enableAllExtractionPipelines } = extractionPipelinesQuery;
  return (
    <div className="extraction-pipelines">
      <Field label="Extaction Pipeline: ">
        <AsyncMultiSelect
          loadOptions={() =>
            datasource.extractionPipelinesDatasource.getAllExtractionPipelines().then((res) =>
              _.map(res, ({ name, externalId }) => ({
                label: name,
                value: externalId,
                id: externalId,
              }))
            )
          }
          value={ids}
          defaultOptions
          allowCustomValue
          placeholder="Select extraction pipeline"
          className="cognite-dropdown width-20"
          onChange={(values) =>
            onQueryChange({
              extractionPipelinesQuery: {
                ...extractionPipelinesQuery,
                ids: values,
              },
            })
          }
        />
      </Field>
      <Field label="List all Extraction Pipelines">
        <Switch
          value={enableAllExtractionPipelines}
          onChange={() =>
            onQueryChange({
              extractionPipelinesQuery: {
                ...extractionPipelinesQuery,
                enableAllExtractionPipelines: !enableAllExtractionPipelines,
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
