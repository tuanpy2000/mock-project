import React from 'react';
import { Select } from "antd";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import './style.scss'
const { Option } = Select;

export default function SearchCountry({ countries }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const onChange = (value) => {
        value = value.toLowerCase();
        navigate(`/country/${value}`);
    };
    const renderCountryOption = () => {
        if (!countries) return null;
        return countries.map((country, index) => {
            return (
                <Option key={index} value={country.countryInfo.iso2}>
                    <img
                        src={country.countryInfo.flag}
                        alt="flag"
                        style={{ width: 20, marginRight: 5 }}
                    />
                    {country.country}
                </Option>
            );
        });
    };
    return (
        <div className="country-search">
            <Select
                size="large"
                showSearch
                className="select"
                placeholder={t("placeholder")}
                optionFilterProp="children"
                onChange={onChange}
            >
                {renderCountryOption()}
            </Select>
        </div>
    );
}
