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
											<div
												src="/sample.jpeg"
												className="bg-blue-300 w-[224px] h-[224px] mt-4 rounded-lg flex justify-center items-center font-bold"
											>
												受け取り済
											</div>
										</div>
									</div>
								) : (
									<div className="h-80 w-64 bg-white border rounded-xl shadow-md">
										<div className="flex justify-center">
											<div
												src="/sample.jpeg"
												className="bg-red-300 w-[224px] h-[224px] mt-4 rounded-lg flex justify-center items-center font-bold"
											>
												未受け取り
											</div>
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
