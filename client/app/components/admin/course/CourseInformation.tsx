import React, { useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}: Props) => {
  const [dragging, setDragging] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setCourseInfo({ ...courseInfo, thumbnail: reader.result });
            }
          };
          reader.readAsDataURL(file);
        }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setCourseInfo({ ...courseInfo, thumbnail: reader.result });
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className="label">
        <div>
          <label>Course Name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="Enter Course Name"
            className="input"
          />
        </div>
        <div className="mt-5">
          <label className="label">Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            placeholder="describe your course"
            className="input !h-min !py-2 "
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          />
        </div>
        <div className="w-full flex justify-between">
          <div className="w-1/2 mt-5">
            <label className="label">Course Price</label>
            <input
              type="number"
              name=""
              id="price"
              required
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              placeholder="Enter Course Price"
              className="input"
            />
          </div>
          <div className="w-1/2 mt-5 ml-3">
            <label className="label">Estimated Price</label>
            <input
              type="number"
              name=""
              id="price"
              required
              value={courseInfo.estimatedPrice}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              placeholder="Enter Course Estimated Price"
              className="input"
            />
          </div>
        </div>
        <div className="mt-5">
          <label className="label">Course Tags</label>
          <input
            type="text"
            name=""
            id=""
            required
            value={courseInfo.tags}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            placeholder="Enter Course Tags"
            className="input"
          />
        </div>

        <div className="w-full flex justify-between">
          <div className="w-1/2 mt-5">
            <label className="label">Course Level</label>
            <input
              type="text"
              name=""
              id="level"
              required
              value={courseInfo.level}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              placeholder="Enter Course Price"
              className="input"
            />
          </div>
          <div className="w-1/2 mt-5 ml-3">
            <label className="label">Demo Url</label>
            <input
              type="text"
              name=""
              id="price"
              required
              value={courseInfo.demoUrl}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              placeholder="Enter Course Estimated Price"
              className="input"
            />
          </div>
        </div>

        <div className="w-full mt-5">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
                <img src={courseInfo.thumbnail} alt="image" className="max-h-full w-full object-cover"/>
            ) : (
                <span className="dark:text-white text-black">
                Drag and drop or click to upload thumbnail
                </span>
            )}
          </label>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
