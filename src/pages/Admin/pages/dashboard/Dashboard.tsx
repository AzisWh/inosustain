'use client';

import React from 'react';
import { Card, Avatar, Progress, Dropdown } from 'flowbite-react';
import { EllipsisVerticalIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/solid';
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from '../../data/Data';
import Layout from '../../layout/Layout';

export function Dashboard() {
  return (
    <Layout>
      <div className="mt-6">
        <div className="grid mb-12 gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {statisticsCardsData.map(({ title, footer, ...rest }) => (
            <div
              key={title}
              className="p-6 text-white bg-blue-500 rounded-lg shadow-md">
              <h6 className="text-lg font-semibold">{title}</h6>
              <p className="text-gray-200">
                <strong className={footer.color}>{footer.value}</strong> 
                {footer.label}
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 mb-6 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {statisticsChartsData.map((props) => (
            <div
              key={props.title}
              className="p-6 text-white bg-green-500 rounded-lg shadow-md">
              <h6 className="text-lg font-semibold">{props.title}</h6>
              <p className="flex items-center text-gray-200">
                <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                {props.footer}
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 mb-4 xl:grid-cols-3">
          <Card className="shadow-md xl:col-span-2">
            <div className="flex items-center justify-between p-6">
              <div>
                <h6 className="text-lg font-semibold text-gray-800">
                  Projects
                </h6>
                <p className="flex items-center gap-1 text-sm text-gray-600">
                  <CheckCircleIcon className="w-4 h-4 text-gray-300" />
                  <strong>30 done</strong> this month
                </p>
              </div>
              <Dropdown
                label=""
                renderTrigger={() => (
                  <button>
                    <EllipsisVerticalIcon className="w-6 h-6 text-gray-600" />
                  </button>
                )}
                placement="bottom-start">
                {/* <Dropdown.Item>Action</Dropdown.Item>
                <Dropdown.Item>Another Action</Dropdown.Item>
                <Dropdown.Item>Something else here</Dropdown.Item> */}
              </Dropdown>
            </div>
            <div className="px-0 pt-0 pb-2 overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr>
                    {['companies', 'members', 'budget', 'completion'].map(
                      (el) => (
                        <th
                          key={el}
                          className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase border-b">
                          {el}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {projectsTableData.map(
                    ({ img, name, members, budget, completion }, key) => {
                      const className = `py-3 px-5 ${
                        key === projectsTableData.length - 1
                          ? ''
                          : 'border-b border-gray-200'
                      }`;

                      return (
                        <tr key={name}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <Avatar img={img} alt={name} rounded />
                              <span className="font-semibold text-gray-800">
                                {name}
                              </span>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex">
                              {members.map(({ img, name }, key) => (
                                <Avatar
                                  key={name}
                                  img={img}
                                  alt={name}
                                  rounded
                                  size="xs"
                                  className={`border-2 border-white ${
                                    key === 0 ? '' : '-ml-2.5'
                                  }`}
                                />
                              ))}
                            </div>
                          </td>
                          <td className={className}>
                            <span className="text-xs text-gray-600">
                              {budget}
                            </span>
                          </td>
                          <td className={className}>
                            <div className="w-10/12">
                              <span className="block mb-1 text-xs text-gray-600">
                                {completion}%
                              </span>
                              <Progress
                                progress={completion}
                                color={completion === 100 ? 'green' : 'blue'}
                                size="sm"
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </Card>
          <Card className="shadow-md">
            <div className="p-6">
              <h6 className="text-lg font-semibold text-gray-800">
                Orders Overview
              </h6>
              <p className="flex items-center gap-1 text-sm text-gray-600">
                <ArrowUpIcon className="h-3.5 w-3.5 text-green-500" />
                <strong>24%</strong> this month
              </p>
            </div>
            <div className="pt-0">
              {ordersOverviewData.map(
                ({ icon, color, title, description }, key) => (
                  <div key={title} className="flex items-start gap-4 py-3">
                    <div
                      className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-gray-200 after:content-[''] ${
                        key === ordersOverviewData.length - 1
                          ? 'after:h-0'
                          : 'after:h-4/6'
                      }`}>
                      {React.createElement(icon, {
                        className: `w-5 h-5 ${color}`,
                      })}
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800">
                        {title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {description}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
