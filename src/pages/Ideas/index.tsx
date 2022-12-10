import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { API, stringToDate } from "../../utils";

function Ideas() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isloading, setIsloading] = useState(false);
  const [bgImage, setBgimage] = useState("/spiderman.jpg");

  const [listPost, setListPost] = useState<any>(null);
  const [meta, setMeta] = useState<any>(null);

  const [page, setPage] = useState<any>(1);
  const [showing, setShowing] = useState<any>(10);
  const [sort, setSort] = useState<any>("newest");

  const getPost = async () => {
    try {
      setIsloading(true);

      const res = await API.get("ideas", {
        params: {
          "page[number]": page,
          "page[size]": showing,
          sort: sort === "newest" ? "-published_at" : "published_at",
          append: ["small_image", "medium_image"],
        },
      });
      setListPost(res?.data?.data);
    } catch (err: any) {
      setListPost(null);
      setMeta(null);
      console.error(err?.message);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    const _page = searchParams.get("page");
    const _show = searchParams.get("show");
    const _sort = searchParams.get("sort");
    // if (_page && _show && _sort) {
    if (_page !== page || _show !== showing || _sort !== sort) {
      setSearchParams(
        `?page=${page}&&show=${showing}&&sort=${sort}`
      );
    }
    // }
    getPost();
    return () => {
      setListPost(null);
      setMeta(null);
    };
  }, [page, showing, sort]);

  useEffect(() => {
    const _page = searchParams.get("page");
    const _show = searchParams.get("show");
    const _sort = searchParams.get("sort");
    if (_page && _show && _sort) {
      if (_page !== page || _show !== showing || _sort !== sort) {
        setPage(_page);
        setShowing(_show);
        setSort(_sort);
      }
    }
  }, []);

  return (
    <div className="overflow-hidden">
      <div
        className="parallax d-flex flex-column align-items-center justify-content-center text-white"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL + bgImage})` }}
      >
        <span className="fs-1">Ideas</span>
        <span className="fs-5">Where all our great things begin</span>
      </div>
      <Container className="my-5">
        <div className="row">
          <div className="col-md-6">
            <span>
              Showing 1 - {showing} {meta && `of ${meta?.total}`}
            </span>
          </div>
          <div className="col-md-6 row justify-content-end">
            <Form.Group
              className="d-flex flex-row align-items-center justify-content-end"
              style={{ width: "fit-content" }}
            >
              <Form.Label className="text-nowrap me-2">
                Show per page:
              </Form.Label>
              <Form.Select
                className="pe-1"
                style={{ borderRadius: 30, width: 130 }}
                onChange={(e: any) => setShowing(e.target.value)}
                value={showing}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="d-flex flex-row align-items-center justify-content-end"
              style={{ width: "fit-content" }}
            >
              <Form.Label className="text-nowrap me-2">Sort by:</Form.Label>
              <Form.Select
                className="pe-1"
                style={{ borderRadius: 30, width: 130 }}
                onChange={(e: any) => setSort(e.target.value)}
                value={sort}
              >
                <option value={"newest"}>Newest</option>
                <option value={"lates"}>Lates</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        {isloading ? (
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: "10rem" }}
          >
            <i className="fa fa-spinner fa-spin fa-3x fa-fw text-primary"></i>
          </div>
        ) : (
          <div className="row gy-4 mt-3">
            {listPost?.map((el: any, i: number) => {
              return (
                <div className="col-md-3 px-3" key={i}>
                  <Card className="shadow p-0" style={{ height: "20.5rem" }}>
                    <Card.Img
                      style={{ width: "100%", height: 180 }}
                      variant="top"
                      placeholder={el?.small_image[0]?.url}
                      src={el?.medium_image[0]?.url}
                      loading="lazy"
                    />
                    <Card.Body>
                      <Card.Text>
                        <span className="d-block text-muted">
                          {stringToDate(el.published_at)}
                        </span>
                        <span
                          className="fs-5"
                          style={{ display: "block", textOverflow: "ellipsis" }}
                        >
                          {el.title}
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
        <div className="d-flex justify-content-center mt-5">
          <Button className="bg-transparent border-0 py-0">
            <i className="fa fa-angle-double-left fa-lg text-muted"></i>
          </Button>
          <Button className="bg-transparent border-0 py-0">
            <i className="fa fa-angle-left fa-lg text-muted"></i>
          </Button>
          <Button className="text-white">1</Button>
          <Button className="bg-transparent border-0">2</Button>
          <Button className="bg-transparent border-0 py-0">
            <i className="fa fa-angle-right fa-lg"></i>
          </Button>
          <Button className="bg-transparent border-0 py-0">
            <i className="fa fa-angle-double-right fa-lg"></i>
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Ideas;
