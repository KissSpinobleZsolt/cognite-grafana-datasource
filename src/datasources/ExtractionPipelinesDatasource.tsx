import { DataQueryRequest, DataQueryResponse } from '@grafana/data';
import _ from 'lodash';
import { CogniteQuery, HttpMethod } from '../types';
import { Connector } from '../connector';

export class ExtractionPipelinesDatasource {
  public constructor(private connector: Connector) {}

  private runQuery(options) {
    const { id } = options;
    return this.connector.fetchItems({
      path: '/extpipes/runs/list',
      method: HttpMethod.POST,
      data: { filter: { externalId: id } },
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
