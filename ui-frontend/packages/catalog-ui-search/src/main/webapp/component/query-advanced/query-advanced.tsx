/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/
import * as React from 'react'
import QuerySettings from '../query-settings/query-settings'
import { FilterBuilderRoot } from '../filter-builder/filter-builder'
import { hot } from 'react-hot-loader'
import Swath from '../swath/swath'
type Props = {
  model: any
}

export const QueryAdvanced = ({ model }: Props) => {
  return (
    <div className="w-full h-full">
      <form
        target="autocomplete"
        action="/search/catalog/blank.html"
        noValidate
        className="w-full h-full"
      >
        <div className="w-full h-full overflow-auto px-3 pt-6">
          <div className="query-advanced">
            <FilterBuilderRoot model={model} />
          </div>
          <div className="py-5">
            <Swath className="w-full h-1" />
          </div>
          <div className="query-settings">
            <QuerySettings model={model} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default hot(module)(QueryAdvanced)
