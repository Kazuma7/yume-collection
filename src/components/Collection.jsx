const userConfirem = [
  {
    confirem: false,
  },
  {
    confirem: false,
  },
  {
    confirem: false,
  },
  {
    confirem: false,
  },
  {
    confirem: false,
  },
  {
    confirem: false,
  },
];

const collecionImage = [{ image: "noimage.png" }];

const Collection = ({ ownList }) => {
  console.log(ownList);
  return (
    <div>
      <div className="py-10">現在手に入れたNFTは4/7です</div>
      <div className="flex justify-center gap-4 lg:w-[800px] w-[400px] flex-wrap mx-auto">
        {ownList &&
          ownList.map((item, index) => {
            return (
              <div key={index}>
                {item.own ? (
                  <div className="h-80 w-64 bg-white border rounded-xl shadow-md">
                    <div className="flex justify-center">
                      <img
                        src="/sample.jpeg"
                        className="bg-black w-[224px] h-[224px] mt-4 rounded-lg"
                      ></img>
                    </div>
                  </div>
                ) : (
                  <div className="h-80 w-64 bg-white border rounded-xl shadow-md">
                    <div className="flex justify-center">
                      <img
                        src="/unacquired.png"
                        className=" w-[224px] h-[224px] mt-4 rounded-lg"
                      ></img>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Collection;
