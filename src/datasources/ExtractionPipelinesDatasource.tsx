import { DataQueryRequest, DataQueryResponse } from '@grafana/data';
import _ from 'lodash';
import { CogniteQuery, HttpMethod } from '../types';
import { Connector } from '../connector';

// eslint-disable-next-line no-nested-ternary
const evalStatus = (text) => (text === 'success' ? 1 : text === 'failure' ? 0 : 2);
export class ExtractionPipelinesDatasource {
  public constructor(private connector: Connector) {}

  private runQuery(options) {
    const { id, numeric } = options;
    return this.connector
      .fetchItems({
        path: '/extpipes/runs/list',
        method: HttpMethod.POST,
        data: { filter: { externalId: id } },
      })
      .then((response) => {
        if (numeric) {
          return _.map(response, ({ status, ...rest }) => ({
            ...rest,
            status: evalStatus(status),
          }));
        }
        return response;
      });
  }
  async query(options: DataQueryRequest<CogniteQuery>): Promise<DataQueryResponse> {
    const data = await Promise.all(
      options.targets.map((target) => {
        return this.runQuery({
          refId: target.refId,
          ...target.extractionPipelinesQuery,
        });
      })
    );
    return {
      data,
    };
  }
  async getAllExtractionPipelines() {
    return this.connector.fetchItems({
      path: '/extpipes',
      method: HttpMethod.GET,
      data: undefined,
    });
  }
}
