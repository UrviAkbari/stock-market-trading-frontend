import React, {useEffect, useState} from "react";

//react-router-dom
import {useSelector, connect} from "react-redux";

//action
import {buySellStock} from "../../store/transaction/action";

import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  Form,
} from "reactstrap";

//form validation
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

const BuySellDialog = (props) => {
  const [stock, setStock] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(stock ? stock * props?.data?.price : 0);
  }, [props, stock]);

  const user = useSelector((state) => state.user.user);

  //form valiadtion rules
  const validation = Yup.object().shape({
    stock: Yup.string().required("Stock is Required!"),
  });

  const formOptions = {resolver: yupResolver(validation)};

  const {register, handleSubmit, reset, formState} = useForm(formOptions);
  const {errors} = formState;

  const onSubmit = (values) => {
    const data = {
      ticker: props?.data?._id,
      price: props?.data?.price,
      stock: parseInt(stock),
      user: user._id,
      type: props?.type === "Buy" ? "buy" : "sell",
    };
    props.buySellStock(data);

    toggle();
  };

  const toggle = () => {
    props.toggle();
  };

  return (
    <Modal isOpen={props.isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} tag="h4">
        {props.type}
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row form>
            <Col className="col-12">
              <div className="mb-3">
                <Label className="form-label">
                  Company Name : {props?.data?.companyName}
                  {` (${props?.data?.ticker})`}
                </Label>
              </div>
              <div className="mb-3">
                <Label className="form-label">
                  How many Stock you want to {props?.type}
                </Label>
                <input
                  type="number"
                  name="stock"
                  value={stock}
                  {...register("stock")}
                  className={`form-control  ${
                    errors.stock ? "is-invalid" : ""
                  }`}
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                />
                <div className="invalid-feedback">{errors.stock?.message}</div>
              </div>
              <div className="mb-3">
                <Label className="form-label">
                  Latest Price : {" " + props?.data?.price}
                </Label>
              </div>
              <div className="mb-3">
                <Label className="form-label">Total : {value}</Label>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-end">
                {props.type === "Buy" ? (
                  user?.balance <= value ? (
                    <button
                      type="button"
                      className="btn btn-secondary save-customer "
                      disabled
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-success save-customer "
                    >
                      Save
                    </button>
                  )
                ) : props.type === "Sell" && stock > props?.data?.userStock ? (
                  <button
                    type="button"
                    className="btn btn-secondary save-customer "
                    disabled
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-success save-customer "
                  >
                    Save
                  </button>
                )}
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default connect(null, {buySellStock})(BuySellDialog);
