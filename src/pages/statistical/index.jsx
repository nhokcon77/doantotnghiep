import { Tabs } from "antd"
import  Statistical  from "./statistical"
import { Report } from "./report"
import  DefaultLayout  from "@common/layouts/default.layout";
import {Dowload} from './dowload';
export default function StatisticalPage()
{
	return(
		<div>
			<DefaultLayout name="ADS" path={"statistics"} >
				<Tabs>
					<Tabs.TabPane tab="Tổng quan" key="1">
						<Statistical />
					</Tabs.TabPane>
					<Tabs.TabPane tab="Doanh thu" key="2">
						<Report />
					</Tabs.TabPane>
					<Tabs.TabPane tab="Báo cáo" key="3">
						<Dowload />
					</Tabs.TabPane>
				</Tabs>
			</DefaultLayout>
		</div>
	)
}