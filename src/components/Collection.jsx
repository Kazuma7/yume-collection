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
  userConfirem[3].confirem = ownList[0]?.own;
  console.log(ownList[0]?.own);
  console.log(userConfirem);
  return (
    <div>
      <div className="py-10">現在手に入れたNFTは1/6です</div>
      <div className="flex justify-center gap-4 lg:w-[800px] w-[480px] flex-wrap mx-auto">
        {ownList &&
          userConfirem.map((item, index) => {
            return (
              <div key={index}>
                {item.confirem ? (
                  <div className="lg:h-80 h-64 lg:w-64 w-52 mb-4 bg-white border rounded-xl shadow-md">
                    <div className="flex justify-center">
                      <img
                        src={`${process.env.PUBLIC_URL}/sample.jpeg`}
                        className=" w-[184px] lg:w-[232px] h-[184px] lg:h-[224px] mt-3 rounded-lg flex justify-center items-center font-bold"
                      ></img>
                    </div>
                  </div>
                ) : (
                  <div className="lg:h-80 h-64 lg:w-64 w-52 mb-4 bg-white border rounded-xl shadow-md">
                    <div className="flex justify-center">
                      <img
                        src={`${process.env.PUBLIC_URL}/unacquired.png`}
                        className=" bg-red-300 w-[184px] lg:w-[232px] h-[184px] lg:h-[224px] mt-3 rounded-lg flex justify-center items-center font-bold"
                      />
                    </div>
                    <div className="font-bold text-gray-400 mt-4">未発見</div>
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
