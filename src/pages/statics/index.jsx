import { Tabs } from "antd"
import  DefaultLayout  from "@common/layouts/default.layout";
import One from "./one/one";
import Two from "./two/two";
import Three from "./three/three";
export default function Statics()
{

	return(
		<div>
			<DefaultLayout name="Thống kê" path={"baocaothongke"} >
				<Tabs>
					<Tabs.TabPane tab="Thống kê tổng quan" key="1">
						<One/>
					</Tabs.TabPane>
					<Tabs.TabPane tab="Thống kê đơn hàng" key="2">
						<Two/>
					</Tabs.TabPane>
					<Tabs.TabPane tab="Thống kê vận đơn" key="3">
						<Three/>
					</Tabs.TabPane>
				</Tabs>
			</DefaultLayout>
		</div>
	)
}