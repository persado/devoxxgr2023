import {Row, Table} from "antd";
import React from "react";

class ResultsTable extends React.Component<{ data: any, columns: any }> {
    render() {
        let {data, columns} = this.props;
        if (data) {
            return (
                <div>
                    <Row justify={"center"}>
                        <h3> Results </h3>
                    </Row>
                    <div>
                        <Table dataSource={data} columns={columns} pagination={false} rowKey='email'/>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default ResultsTable;